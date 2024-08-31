import assert from 'node:assert';
import AppError from './appError';
import { HttpStatusCode } from '../constants/http';
import AppErrorCode from '../constants/appErrorCode';

type AppAssert = (
	condition: any,
	httpStatusCode: HttpStatusCode,
	message: string,
	AppErrorCode?: AppErrorCode
) => asserts condition;

const appAssert: AppAssert = (
	condition,
	httpStatusCode,
	message,
	AppErrorCode
) => assert(condition, new AppError(httpStatusCode, message, AppErrorCode));

export default appAssert;
