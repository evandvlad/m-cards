import { AppError } from "~shared/lib/error/index.ts";
import {
	hasProp,
	isBoolean,
	isFilledString,
	isIsoDatetimeString,
	isObject,
	isoDatetimeFormat,
	isOneOf,
	isString,
} from "~shared/lib/value-predicates/index.ts";

const cardSideSettingsType = ["internal"] as const;

type InternalCardSideSettings = {
	type: typeof cardSideSettingsType[0];
	value: string;
	isHtml: boolean;
};

export type CardSide = string | InternalCardSideSettings;

export type CardMeta = {
	id: string;
	registeredAt: string;
};

export type Card = {
	name: string;
	front: CardSide;
	back?: CardSide;
	inactive?: boolean;
	meta?: CardMeta;
};

function assertCardSide(data: unknown, baseMessage: string): asserts data is CardSide {
	if (isString(data)) {
		if (!isFilledString(data)) {
			throw new AppError(`${baseMessage} Must be a non-empty string.`);
		}

		return;
	}

	if (!isObject(data)) {
		throw new AppError(`${baseMessage} Must be an object.`);
	}

	if (!hasProp(data, "type")) {
		throw new AppError(`${baseMessage} There is no "type".`);
	}

	if (!isOneOf(data.type, cardSideSettingsType)) {
		throw new AppError(`${baseMessage} The "type" must be one of these - ${cardSideSettingsType}.`);
	}

	if (data.type === "internal") {
		if (!hasProp(data, "value")) {
			throw new AppError(`${baseMessage} There is no "value".`);
		}

		if (!isFilledString(data.value)) {
			throw new AppError(`${baseMessage} The "value" must be a non-empty string.`);
		}

		if (!hasProp(data, "isHtml")) {
			throw new AppError(`${baseMessage} There is no "isHtml".`);
		}

		if (!isBoolean(data.isHtml)) {
			throw new AppError(
				`${baseMessage} The "isHtml" must be a boolean.`,
			);
		}
	}
}

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

	assertCardSide(data.front, `${baseMessage} The "front" is incorrect.`);

	if (hasProp(data, "back") && !isFilledString(data.back)) {
		assertCardSide(data.back, `${baseMessage} The "back" is incorrect.`);
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
