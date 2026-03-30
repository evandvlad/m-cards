import { AppError } from "~shared/lib/error/index.ts";
import {
	hasProp,
	isBoolean,
	isFilledString,
	isIsoDatetimeString,
	isObject,
	isoDatetimeFormat,
} from "~shared/lib/value-predicates/index.ts";

import { assertVersion } from "../version/index.ts";
import { assertFilepaths } from "../filepaths/index.ts";

const version = 1;

export type CardSetMeta = {
	id: string;
	registeredAt: string;
};

export type CardSet = {
	version: number;
	name: string;
	cards: string[];
	randomCardSides?: boolean;
	meta?: CardSetMeta;
};

function assertMeta(data: unknown, baseMessage: string): asserts data is CardSetMeta {
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

export function assertCardSet(data: unknown, baseMessage: string): asserts data is CardSet {
	if (!isObject(data)) {
		throw new AppError(`${baseMessage} Must be an object.`);
	}

	if (!hasProp(data, "version")) {
		throw new AppError(`${baseMessage} There is no "version".`);
	}

	assertVersion(data.version, { version, baseMessage });

	if (!hasProp(data, "name")) {
		throw new AppError(`${baseMessage} There is no "name".`);
	}

	if (!isFilledString(data.name)) {
		throw new AppError(`${baseMessage} The "name" must be a non-empty string.`);
	}

	if (hasProp(data, "randomCardSides") && !isBoolean(data.randomCardSides)) {
		throw new AppError(`${baseMessage} The "randomCardSides" must be a boolean or empty.`);
	}

	if (!hasProp(data, "cards")) {
		throw new AppError(`${baseMessage} There is no "cards".`);
	}

	assertFilepaths(data.cards, `${baseMessage} The "cards" is incorrect.`);

	if (hasProp(data, "meta")) {
		assertMeta(data.meta, `${baseMessage} The "meta" is incorrect.`);
	}
}
