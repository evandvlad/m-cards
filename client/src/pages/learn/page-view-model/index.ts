import { signal } from "@preact/signals";

import type { CardSet } from "~shared/data-values/app.ts";

import type { CardsService } from "~client/web-services/index.ts";
import { randomInt } from "~client/lib/random/index.ts";

import { ActiveCard } from "./active-card.ts";

type Params = {
	id: string;
	cardsService: CardsService;
};

export class PageViewModel {
	isEmpty;
	title;
	activeCard;

	#cards;

	static async create({ id, cardsService }: Params) {
		const cardSet = await cardsService.getCardSet(id);
		return new this(cardSet);
	}

	private constructor({ name, cards }: CardSet) {
		this.title = name;
		this.#cards = cards;
		this.isEmpty = this.#cards.length === 0;

		this.activeCard = signal(this.#getRandomActiveCard());
	}

	showNextCard = () => {
		this.activeCard.value = this.#getRandomActiveCard();
	};

	#getRandomActiveCard() {
		const randomIndex = randomInt(this.#cards.length);
		const { front, back } = this.#cards[randomIndex];

		return new ActiveCard({ front, back });
	}
}
