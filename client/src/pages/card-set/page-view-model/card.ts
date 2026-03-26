import type { Card as CardData } from "~shared/data-values/app.ts";

import { showCardDetailDialog } from "../card-detail-dialog/index.tsx";

export class Card {
	name;
	front;
	back;

	#card;

	constructor(card: CardData) {
		this.#card = card;

		this.name = card.name;
		this.front = card.front;
		this.back = card.back;
	}

	viewCardDetail = () => {
		showCardDetailDialog({ card: this.#card });
	};
}
