export const hexToRgb = (hex: string): string => {
	let r = 0,
		g = 0,
		b = 0;

	if (hex.length === 4) {
		r = parseInt(hex[1] + hex[1], 16);
		g = parseInt(hex[2] + hex[2], 16);
		b = parseInt(hex[3] + hex[3], 16);
	} else if (hex.length === 7) {
		r = parseInt(hex[1] + hex[2], 16);
		g = parseInt(hex[3] + hex[4], 16);
		b = parseInt(hex[5] + hex[6], 16);
	}
	return `${r}, ${g}, ${b}`;
};

export const rgbToHex = (colorStr: string | undefined): string => {
	if (!colorStr) {
		return '';
	}
	const [r, g, b] = colorStr.split(',').map(Number);
	// return { r, g, b };s

	const toHex = (n: number): string => {
		const hex = n.toString(16).padStart(2, '0');
		return hex;
	};

	return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const rgbaToRgb = (r: number, g: number, b: number, a: number) => {
	const backgroundColor = { r: 255, g: 255, b: 255 }; // White background

	// Calculate the blended RGB values
	const blendedR = Math.round(a * r + (1 - a) * backgroundColor.r);
	const blendedG = Math.round(a * g + (1 - a) * backgroundColor.g);
	const blendedB = Math.round(a * b + (1 - a) * backgroundColor.b);

	return `rgb(${blendedR}, ${blendedG}, ${blendedB})`;
};

export const parseColor = (colorStr: string) => {
	const [r, g, b] = colorStr.split(',').map(Number);
	return { r, g, b };
};
