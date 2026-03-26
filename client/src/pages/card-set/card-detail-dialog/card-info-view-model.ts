import type { Card } from "~shared/data-values/app.ts";
import { formatToDisplay } from "~shared/lib/datetime/index.ts";

export class CardInfoViewModel {
	registeredAt;

	constructor({ registeredAt }: Card) {
		this.registeredAt = formatToDisplay(registeredAt);
	}
}
