import { AppError, assertNever } from "~shared/lib/error/index.ts";
import {
	hasProp,
	isBoolean,
	isFilledString,
	isHtmlFilepathString,
	isIsoDatetimeString,
	isObject,
	isoDatetimeFormat,
	isOneOf,
	isString,
} from "~shared/lib/value-predicates/index.ts";

const cardSideTypes = ["internal", "external"] as const;

export const cardTemplateIdAttrName = "data-id";

type InternalCardSide = {
	type: typeof cardSideTypes[0];
	value: string;
	isHtml: boolean;
};

type ExternalCardSide = {
	type: typeof cardSideTypes[1];
	htmlPath: string;
	templateId: string;
};

export type CardSide = string | InternalCardSide | ExternalCardSide;

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

	if (!isOneOf(data.type, cardSideTypes)) {
		throw new AppError(`${baseMessage} The "type" must be one of these - ${cardSideTypes.join(", ")}.`);
	}

	const { type } = data;

	switch (type) {
		case "internal": {
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

			return;
		}

		case "external": {
			if (!hasProp(data, "htmlPath")) {
				throw new AppError(`${baseMessage} There is no "htmlPath".`);
			}

			if (!isHtmlFilepathString(data.htmlPath)) {
				throw new AppError(`${baseMessage} The "htmlPath" is incorrect.`);
			}

			if (!hasProp(data, "templateId")) {
				throw new AppError(`${baseMessage} There is no "templateId".`);
			}

			if (!isFilledString(data.templateId)) {
				throw new AppError(`${baseMessage} The "templateId" must be a non-empty string.`);
			}

			return;
		}

		default:
			assertNever(type);
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
