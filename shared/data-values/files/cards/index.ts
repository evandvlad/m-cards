import { AppError } from "~shared/lib/error/index.ts";
import { hasProp, isArray, isObject } from "~shared/lib/value-predicates/index.ts";

import { assertVersion } from "../version/index.ts";
import { assertCard, type Card } from "../card/index.ts";

const version = 1;

export type Cards = {
	version: number;
	cards: Card[];
};

export function assertCards(data: unknown, baseMessage: string): asserts data is Cards {
	if (!isObject(data)) {
		throw new AppError(`${baseMessage} Must be an object.`);
	}

	if (!hasProp(data, "version")) {
		throw new AppError(`${baseMessage} There is no "version".`);
	}

	assertVersion(data.version, { version, baseMessage });

	if (!hasProp(data, "cards")) {
		throw new AppError(`${baseMessage} There is no "cards".`);
	}

	if (!isArray(data.cards)) {
		throw new AppError(`${baseMessage} The "cards" must be an array.`);
	}

	data.cards.forEach((card) => {
		assertCard(card, `${baseMessage} There card's item is incorrect.`);
	});
}
