import { AppError } from "~shared/lib/error/index.ts";
import {
	hasProp,
	isBoolean,
	isFilledString,
	isIsoDatetimeString,
	isObject,
	isoDatetimeFormat,
} from "~shared/lib/value-predicates/index.ts";

export type CardMeta = {
	id: string;
	registeredAt: string;
};

export type Card = {
	name: string;
	front: string;
	back?: string;
	inactive?: boolean;
	meta?: CardMeta;
};

function assertMeta(data: unknown, baseMessage: string): asserts data is CardMeta {
	if (!isObject(data)) {
		throw new AppError(`${baseMessage} Must be an object.`);
	}

	if (!hasProp(data, "id")) {
		throw new AppError(`${baseMessage} There is no "id".`);
	}

	if (!isFilledString(data.id)) {
		throw new AppError(`${baseMessage} The "id" must be a non-empty string.`);
	}

	if (!hasProp(data, "registeredAt")) {
		throw new AppError(`${baseMessage} There is no "registeredAt".`);
	}

	if (!isIsoDatetimeString(data.registeredAt)) {
		throw new AppError(
			`${baseMessage} The "registeredAt" must be a '${isoDatetimeFormat}' string.`,
		);
	}
}

export function assertCard(data: unknown, baseMessage: string): asserts data is Card {
	if (!isObject(data)) {
		throw new AppError(`${baseMessage} Must be an object.`);
	}

	if (!hasProp(data, "name")) {
		throw new AppError(`${baseMessage} There is no "name".`);
	}

	if (!isFilledString(data.name)) {
		throw new AppError(`${baseMessage} The "name" must be a non-empty string.`);
	}

	if (!hasProp(data, "front")) {
		throw new AppError(`${baseMessage} There is no "front".`);
	}

	if (!isFilledString(data.front)) {
		throw new AppError(`${baseMessage} The "front" must be a non-empty string.`);
	}

	if (hasProp(data, "back") && !isFilledString(data.back)) {
		throw new AppError(
			`${baseMessage} The "back" must be a non-empty string or empty.`,
		);
	}

	if (hasProp(data, "inactive") && !isBoolean(data.inactive)) {
		throw new AppError(
			`${baseMessage} The "inactive" must be a boolean or empty.`,
		);
	}

	if (hasProp(data, "meta")) {
		assertMeta(data.meta, `${baseMessage} The "meta" is incorrect.`);
	}
}
