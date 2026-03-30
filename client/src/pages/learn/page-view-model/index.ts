import { signal } from "@preact/signals";

import type { CardSet } from "~shared/data-values/app.ts";

import type { CardsService } from "~client/web-services/index.ts";
import { randomItemInArray } from "~client/lib/random/index.ts";

import { ActiveCardViewModel } from "./active-card.ts";

type Params = {
	id: string;
	cardsService: CardsService;
};

export class PageViewModel {
	isEmpty;
	title;
	activeCard;

	#set;

	static async create({ id, cardsService }: Params) {
		const cardSet = await cardsService.getCardSet(id);
		return new this(cardSet);
	}

	private constructor(set: CardSet) {
		this.#set = set;

		this.title = set.name;
		this.isEmpty = set.cards.length === 0;

		this.activeCard = signal(this.#getRandomActiveCard());
	}

	showNextCard = () => {
		this.activeCard.value = this.#getRandomActiveCard();
	};

	#getRandomActiveCard() {
		const { front, back } = randomItemInArray(this.#set.cards);

		const sides = this.#set.randomCardSides && typeof back !== "undefined"
			? randomItemInArray([{ front, back }, { front: back, back: front }])
			: { front, back };

		return new ActiveCardViewModel({
			front: sides.front,
			back: sides.back,
			isReversed: sides.front !== front,
		});
	}
}
