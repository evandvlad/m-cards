import { assertNonNullable } from "~shared/lib/error/index.ts";
import type { CardSet } from "~shared/data-values/app.ts";
import { formatToDisplay } from "~shared/lib/datetime/index.ts";

import type { CardsService } from "~client/web-services/index.ts";

import { Card } from "./card.ts";

type Params = {
	id: string;
	cardsService: CardsService;
};

export class PageViewModel {
	isEmpty;
	title;
	cardsCount;
	registeredAt;
	cardIds;

	#cardsMap;

	static async create({ id, cardsService }: Params) {
		const cardSet = await cardsService.getCardSet(id);
		return new this(cardSet);
	}

	private constructor({ name, registeredAt, cards }: CardSet) {
		this.title = name;
		this.cardsCount = cards.length;
		this.isEmpty = this.cardsCount === 0;
		this.registeredAt = formatToDisplay(registeredAt);

		this.#cardsMap = new Map(cards.map((card) => [card.id, new Card(card)]));
		this.cardIds = Array.from(this.#cardsMap.keys());
	}

	getCard = (id: string) => {
		const card = this.#cardsMap.get(id);
		assertNonNullable(card, `Can't find a card with id "${id}"`);
		return card;
	};
}
