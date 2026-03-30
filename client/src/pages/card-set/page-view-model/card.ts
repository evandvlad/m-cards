import type { Card } from "~shared/data-values/app.ts";

import { showCardDetailDialog } from "../card-detail-dialog/index.tsx";

export class CardViewModel {
	name;
	front;
	back;

	#card;

	constructor(card: Card) {
		this.#card = card;

		this.name = card.name;
		this.front = card.front;
		this.back = card.back;
	}

	viewCardDetail = () => {
		showCardDetailDialog({ card: this.#card });
	};
}
