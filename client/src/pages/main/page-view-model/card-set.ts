import { getCardSetUrl, getLearnUrl } from "~shared/page-urls.ts";
import type { CardSet as CardSetData } from "~shared/data-values/app.ts";
import { formatToDisplay } from "~shared/lib/datetime/index.ts";

export class CardSet {
	name;
	cardsNumber;
	registeredAt;
	cardSetUrl;
	learnUrl;

	constructor({ id, name, registeredAt, cards }: CardSetData) {
		this.name = name;
		this.registeredAt = formatToDisplay(registeredAt);
		this.cardsNumber = cards.length;
		this.cardSetUrl = getCardSetUrl({ id });
		this.learnUrl = getLearnUrl({ id });
	}
}
