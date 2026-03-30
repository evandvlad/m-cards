import { randomIntegerBetween } from "@std/random";

import { genBool, genDatetime, genId, genText } from "~shared/testing/random-data-generator.ts";

import type {
	Card as FileCard,
	CardMeta as FileCardMeta,
	Cards as FileCards,
	CardSet as FileCardSet,
	CardSetMeta as FileCardSetMeta,
	CardSets as FileCardSets,
} from "~shared/data-values/files/index.ts";
import type { Card, CardSet, CardSets } from "~shared/data-values/app.ts";

type UseMeta = "yes" | "no" | "random";
type Range = [from: number, to: number];
type Count = number | Range;

function createEmptyArray(count: Count) {
	const num = typeof count === "number" ? count : randomIntegerBetween(count[0], count[1]);
	return Array(num).fill(null);
}

function createFileCardMeta(stategy: UseMeta) {
	if (!(stategy === "yes" || stategy === "random" && genBool())) {
		return null;
	}

	const meta: FileCardMeta = {
		id: genId(),
		registeredAt: genDatetime(),
	};

	return meta;
}

function createFileCardSetMeta(stategy: UseMeta) {
	if (!(stategy === "yes" || stategy === "random" && genBool())) {
		return null;
	}

	const meta: FileCardSetMeta = {
		id: genId(),
		registeredAt: genDatetime(),
	};

	return meta;
}

function createFileCard(
	{ useMeta = "random", randomizeInvisibleCard = true }: { useMeta?: UseMeta; randomizeInvisibleCard?: boolean } = {},
) {
	const card: FileCard = {
		name: genText({ minWords: 1, maxWords: 5 }),
		front: genText({ minWords: 1, maxWords: 25 }),
	};

	if (genBool()) {
		card.back = genText({ minWords: 1, maxWords: 25 });
	}

	if (randomizeInvisibleCard && genBool()) {
		card.inactive = genBool();
	}

	const meta = createFileCardMeta(useMeta);

	if (meta) {
		card.meta = meta;
	}

	return card;
}

export function createFileCards(
	{ useMeta = "random", cardsCount = [0, 100], randomizeInvisibleCard }: {
		useMeta?: UseMeta;
		cardsCount?: Count;
		randomizeInvisibleCard?: boolean;
	} = {},
): FileCards {
	return {
		version: 1,
		cards: createEmptyArray(cardsCount).map(() => createFileCard({ useMeta, randomizeInvisibleCard })),
	};
}

export function createFileCardSet({ cards, useMeta = "random" }: { cards: string[]; useMeta?: UseMeta }) {
	const cardSet: FileCardSet = {
		version: 1,
		name: genText({ minWords: 1, maxWords: 5 }),
		cards,
	};

	const meta = createFileCardSetMeta(useMeta);

	if (meta) {
		cardSet.meta = meta;
	}

	return cardSet;
}

export function createFileCardSets({ sets }: { sets: string[] }): FileCardSets {
	return {
		version: 1,
		sets,
	};
}

function createCard() {
	const card: Card = {
		id: genId(),
		name: genText({ minWords: 1, maxWords: 5 }),
		front: genText({ minWords: 1, maxWords: 25 }),
		registeredAt: genDatetime(),
	};

	if (genBool()) {
		card.back = genText({ minWords: 1, maxWords: 25 });
	}

	return card;
}

function createCards({ cardsCount = [0, 100] }: { cardsCount?: Count } = {}) {
	return createEmptyArray(cardsCount).map(() => createCard());
}

function createCardSet({ cardsCount }: { cardsCount?: Count } = {}) {
	const cardSet: CardSet = {
		id: genId(),
		name: genText({ minWords: 1, maxWords: 5 }),
		registeredAt: genDatetime(),
		randomCardSides: genBool(),
		cards: createCards({ cardsCount }),
	};

	return cardSet;
}

export function createCardSets(
	{ setsCount = [0, 100], cardsCount }: { setsCount?: Count; cardsCount?: Count } = {},
): CardSets {
	return { items: createEmptyArray(setsCount).map(() => createCardSet({ cardsCount })) };
}
