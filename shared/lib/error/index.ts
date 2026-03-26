import { hasProp, isFilledString, isNonNullable, isObject } from "~shared/lib/value-predicates/index.ts";

export const generalErrorMessage = "Oh :( Something went wrong.";

export type ServerFriendlyError = {
	isItServerFriedlyError: true;
	message: string;
};

export class AppError extends Error {
	override name = "AppError";
}

export function isAppError(value: unknown): value is AppError {
	return value instanceof AppError;
}

export function isServerFriendlyError(value: unknown): value is ServerFriendlyError {
	if (!isObject(value)) {
		return false;
	}

	if (!hasProp(value, "isItServerFriedlyError") || value.isItServerFriedlyError !== true) {
		return false;
	}

	return hasProp(value, "message") && isFilledString(value.message);
}

export function assert(value: unknown, message: string) {
	if (!value) {
		throw new AppError(message);
	}
}

export function assertNonNullable<T>(value: T, message: string): asserts value is NonNullable<T> {
	if (!isNonNullable(value)) {
		throw new AppError(message);
	}
}

export function assertNever(value: never): never {
	throw new AppError(`Unexpected value: ${value}`);
}
