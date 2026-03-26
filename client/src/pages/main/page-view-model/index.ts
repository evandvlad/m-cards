import { assertNonNullable } from "~shared/lib/error/index.ts";
import type { CardSets } from "~shared/data-values/app.ts";

import type { CardsService } from "~client/web-services/index.ts";

import { CardSet } from "./card-set.ts";

type Params = {
	cardsService: CardsService;
};

export class PageViewModel {
	isEmpty;
	cardSetIds;

	#cardSetsMap;

	static async create({ cardsService }: Params) {
		const cardSets = await cardsService.getCardSets();
		return new this(cardSets);
	}

	private constructor({ items }: CardSets) {
		this.isEmpty = items.length === 0;

		this.#cardSetsMap = new Map(items.map((item) => [item.id, new CardSet(item)]));
		this.cardSetIds = Array.from(this.#cardSetsMap.keys());
	}

	getCardSet = (id: string) => {
		const cardSet = this.#cardSetsMap.get(id);
		assertNonNullable(cardSet, `Can't find a card set with id "${id}"`);
		return cardSet;
	};
}
