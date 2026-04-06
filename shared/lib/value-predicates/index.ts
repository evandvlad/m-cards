type ObjWithProp<T extends object, K extends string> =
	& T
	& {
		[property in K]: K extends keyof T ? NonNullable<T[K]> : unknown;
	};

export const isoDatetimeFormat = "YYYY-MM-DDTHH:mm:ss.sssZ";
const isoDatetimeRegExp = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

export function isString(value: unknown): value is string {
	return typeof value === "string";
}

export function isFilledString(value: unknown): value is string {
	return isString(value) && value.length > 0;
}

export function isIsoDatetimeString(value: unknown): value is string {
	return isString(value) && isoDatetimeRegExp.test(value);
}

export function isJsonFilepathString(value: unknown): value is string {
	if (!isString(value)) {
		return false;
	}

	const suffix = ".json";

	return value.endsWith(suffix) && value.length > suffix.length;
}

export function isUInteger(value: unknown): value is number {
	return typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
}

export function isBoolean(value: unknown): value is boolean {
	return typeof value === "boolean";
}

export function isObject(value: unknown): value is object {
	return typeof value === "object" && value !== null && !isArray(value);
}

export function isArray(value: unknown): value is Array<unknown> {
	return Array.isArray(value);
}

export function isNonNullable<T>(value: T): value is NonNullable<T> {
	return value !== null && value !== undefined;
}

export function hasProp<T extends object, K extends string>(
	value: T,
	property: K,
): value is ObjWithProp<T, K> {
	return property in value;
}

export function isOneOf<const T>(value: unknown, set: T[]): value is T {
	for (const val of set) {
		if (val === value) {
			return true;
		}
	}

	return false;
}
