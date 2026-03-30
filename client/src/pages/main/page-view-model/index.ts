import { signal } from "@preact/signals";

import { assertNonNullable } from "~shared/lib/error/index.ts";
import type { CardSets } from "~shared/data-values/app.ts";

import { EntityFilter } from "~client/widgets/entity-filter/index.tsx";
import type { CardsService } from "~client/web-services/index.ts";

import { CardSetViewModel } from "./card-set.ts";

type Params = {
	cardsService: CardsService;
};

export class PageViewModel {
	isEmpty;
	cardSetIds;
	filter;

	#cardSetsMap;

	static async create({ cardsService }: Params) {
		const cardSets = await cardsService.getCardSets();
		return new this(cardSets);
	}

	private constructor({ items }: CardSets) {
		this.isEmpty = items.length === 0;

		this.#cardSetsMap = new Map(items.map((item) => [item.id, new CardSetViewModel(item)]));
		this.cardSetIds = signal(Array.from(this.#cardSetsMap.keys()));

		this.filter = new EntityFilter({ onChanged: this.#handleFilterChanged });
	}

	getCardSet = (id: string) => {
		const cardSet = this.#cardSetsMap.get(id);
		assertNonNullable(cardSet, `Can't find a card set with id "${id}"`);
		return cardSet;
	};

	#handleFilterChanged = () => {
		const allCardSetIds = Array.from(this.#cardSetsMap.keys());

		this.cardSetIds.value = allCardSetIds.filter((id) => {
			const { name } = this.getCardSet(id);
			return this.filter.isMatched(name);
		});
	};
}
