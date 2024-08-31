import { APP_ORIGIN } from '../constants/env';
import {
	CONFLICT,
	INTERNAL_SERVER_ERROR,
	NOT_FOUND,
	TOO_MANY_REQUESTS,
	UNAUTHORIZED,
	UNPROCESSABLE_CONTENT,
} from '../constants/http';
import VerificationCodeType from '../constants/verificationCodeType';
import SessionModel, { SessionDocument } from '../models/session.model';
import UserModel, { UserDocument } from '../models/user.model';
import VerificationCodeModel from '../models/verificationCode.model';
import appAssert from '../utils/appAssert';
import { hashValue } from '../utils/bcrypt';
import {
	ONE_DAY_MS,
	fiveMinutesAgo,
	oneHourFromNow,
	oneYearFromNow,
	thirtyDaysFromNow,
} from '../utils/date';
import {
	getPasswordResetTemplate,
	getVerifyEmailTemplate,
} from '../utils/emailTemplates';
import {
	RefreshTokenPayload,
	refreshTokenSignOptions,
	signToken,
	verifyToken,
} from '../utils/jwt';
import { sendMail } from '../utils/sendMail';

type CreateAccountParams = {
	email: string;
	password: string;
	userAgent?: string;
};
export const createAccount = async (data: CreateAccountParams) => {
	const existingUser = await UserModel.exists({
		email: data.email,
	});
	appAssert(!existingUser, CONFLICT, 'Email already in use');

	const user = await UserModel.create({
		email: data.email,
		password: data.password,
	});
	const userId = user._id;
	const verificationCode = await VerificationCodeModel.create({
		userId,
		type: VerificationCodeType.EmailVerification,
		expiresAt: oneYearFromNow(),
	});

	const url = `${APP_ORIGIN}/email/verify/${verificationCode._id}`;

	const { error } = await sendMail({
		to: user.email,
		...getVerifyEmailTemplate(url),
	});
	if (error) console.error(error);

	const session = await SessionModel.create({
		userId,
		userAgent: data.userAgent,
	});

	const refreshToken = signToken(
		{
			sessionId: session._id,
		},
		refreshTokenSignOptions
	);
	const accessToken = signToken({
		userId,
		sessionId: session._id,
	});
	return {
		user: user.omitPassword(),
		accessToken,
		refreshToken,
	};
};

type LoginParams = {
	email: string;
	password: string;
	userAgent?: string;
};

export const loginUser = async ({
	email,
	password,
	userAgent,
}: LoginParams) => {
	const user = await UserModel.findOne({ email });
	appAssert(user, UNAUTHORIZED, 'Invalid email or password 2');

	console.log(password);
	const isValid = await user.comparePassword(password);
	console.log(isValid);
	appAssert(isValid, UNAUTHORIZED, 'Invalid email or password');

	const userId = user._id;
	const session = await SessionModel.create({
		userId,
		userAgent,
	});

	const sessionInfo: RefreshTokenPayload = {
		sessionId: session._id,
	};

	const refreshToken = signToken(sessionInfo, refreshTokenSignOptions);
	const accessToken = signToken({
		...sessionInfo,
		userId,
	});
	return {
		user: user.omitPassword(),
		accessToken,
		refreshToken,
	};
};

export const verifyEmail = async (code: string) => {
	const validCode = await VerificationCodeModel.findOne({
		_id: code,
		type: VerificationCodeType.EmailVerification,
		expiresAt: { $gt: new Date() },
	});
	appAssert(validCode, NOT_FOUND, 'Invalid or expired verification code');

	const updatedUser = await UserModel.findByIdAndUpdate(
		validCode.userId,
		{
			verified: true,
		},
		{ new: true }
	);
	appAssert(updatedUser, INTERNAL_SERVER_ERROR, 'Failed to verify email');

	await validCode.deleteOne();

	return {
		user: updatedUser.omitPassword(),
	};
};

export const refreshUserAccessToken = async (refreshToken: string) => {
	const { payload } = verifyToken<RefreshTokenPayload>(refreshToken, {
		secret: refreshTokenSignOptions.secret,
	});
	appAssert(payload, UNAUTHORIZED, 'Invalid refresh token');

	const session = await SessionModel.findById(payload.sessionId);
	const now = Date.now();
	appAssert(
		session && session.expiresAt.getTime() > now,
		UNAUTHORIZED,
		'Session expired'
	);

	const sessionNeedsRefresh = session.expiresAt.getTime() - now <= ONE_DAY_MS;
	if (sessionNeedsRefresh) {
		session.expiresAt = thirtyDaysFromNow();
		await session.save();
	}

	const newRefreshToken = sessionNeedsRefresh
		? signToken(
				{
					sessionId: session._id,
				},
				refreshTokenSignOptions
		  )
		: undefined;

	const accessToken = signToken({
		userId: session.userId,
		sessionId: session._id,
	});

	return {
		accessToken,
		newRefreshToken,
	};
};

export const sendPasswordResetEmail = async (email: string) => {
	try {
		const user = await UserModel.findOne({ email });
		appAssert(user, NOT_FOUND, 'User not found');

		const fiveMinAgo = fiveMinutesAgo();
		const count = await VerificationCodeModel.countDocuments({
			userId: user._id,
			type: VerificationCodeType.PasswordReset,
			createdAt: { $gt: fiveMinAgo },
		});
		appAssert(
			count <= 1,
			TOO_MANY_REQUESTS,
			'Too many requests, please try again later'
		);

		const expiresAt = oneHourFromNow();
		const verificationCode = await VerificationCodeModel.create({
			userId: user._id,
			type: VerificationCodeType.PasswordReset,
			expiresAt,
		});

		const url = `${APP_ORIGIN}/password/reset?code=${
			verificationCode._id
		}&exp=${expiresAt.getTime()}`;

		const { data, error } = await sendMail({
			to: email,
			...getPasswordResetTemplate(url),
		});

		appAssert(
			data?.id,
			INTERNAL_SERVER_ERROR,
			`${error?.name} - ${error?.message}`
		);
		return {
			url,
			emailId: data.id,
		};
	} catch (error: any) {
		console.log('SendPasswordResetError:', error.message);
		return {};
	}
};

type ResetPasswordParams = {
	password: string;
	verificationCode: string;
};

export const resetPassword = async ({
	verificationCode,
	password,
}: ResetPasswordParams) => {
	const validCode = await VerificationCodeModel.findOne({
		_id: verificationCode,
		type: VerificationCodeType.PasswordReset,
		expiresAt: { $gt: new Date() },
	});
	appAssert(validCode, NOT_FOUND, 'Invalid or expired verification code');

	const updatedUser = await UserModel.findByIdAndUpdate(validCode.userId, {
		password: await hashValue(password),
	});
	appAssert(updatedUser, INTERNAL_SERVER_ERROR, 'Failed to reset password');

	await validCode.deleteOne();

	await SessionModel.deleteMany({ userId: validCode.userId });

	return { user: updatedUser.omitPassword() };
};
