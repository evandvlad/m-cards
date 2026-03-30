import { signal } from "@preact/signals";

import { assertNonNullable } from "~shared/lib/error/index.ts";
import type { CardSet } from "~shared/data-values/app.ts";
import { formatToDisplay } from "~shared/lib/datetime/index.ts";
import { getLearnUrl } from "~shared/page-urls.ts";

import type { CardsService } from "~client/web-services/index.ts";
import { EntityFilter } from "~client/widgets/entity-filter/index.tsx";

import { CardViewModel } from "./card.ts";

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
	learnUrl;
	filter;

	#cardsMap;

	static async create({ id, cardsService }: Params) {
		const cardSet = await cardsService.getCardSet(id);
		return new this(cardSet);
	}

	private constructor({ id, name, registeredAt, cards }: CardSet) {
		this.title = name;
		this.cardsCount = cards.length;
		this.isEmpty = this.cardsCount === 0;
		this.registeredAt = formatToDisplay(registeredAt);

		this.#cardsMap = new Map(cards.map((card) => [card.id, new CardViewModel(card)]));

		this.cardIds = signal(Array.from(this.#cardsMap.keys()));
		this.learnUrl = getLearnUrl({ id });
		this.filter = new EntityFilter({ onChanged: this.#handleFilterChanged });
	}

	getCard = (id: string) => {
		const card = this.#cardsMap.get(id);
		assertNonNullable(card, `Can't find a card with id "${id}"`);
		return card;
	};

	#handleFilterChanged = () => {
		const allCardIds = Array.from(this.#cardsMap.keys());

		this.cardIds.value = allCardIds.filter((id) => {
			const { name } = this.getCard(id);
			return this.filter.isMatched(name);
		});
	};
}
