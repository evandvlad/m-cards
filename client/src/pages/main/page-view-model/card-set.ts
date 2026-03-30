import { getCardSetUrl, getLearnUrl } from "~shared/page-urls.ts";
import type { CardSet } from "~shared/data-values/app.ts";
import { formatToDisplay } from "~shared/lib/datetime/index.ts";

export class CardSetViewModel {
	name;
	cardsNumber;
	registeredAt;
	cardSetUrl;
	learnUrl;

	constructor({ id, name, registeredAt, cards }: CardSet) {
		this.name = name;
		this.registeredAt = formatToDisplay(registeredAt);
		this.cardsNumber = cards.length;
		this.cardSetUrl = getCardSetUrl({ id });
		this.learnUrl = getLearnUrl({ id });
	}
}
