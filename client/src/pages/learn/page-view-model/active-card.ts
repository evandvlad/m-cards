import type { CardSide } from "~shared/data-values/app.ts";

type Params = {
	front: CardSide;
	back?: CardSide;
	isReversed: boolean;
};

export class ActiveCardViewModel {
	front;
	back;
	isReversed;

	constructor({ front, back, isReversed }: Params) {
		this.front = front;
		this.back = back;
		this.isReversed = isReversed;
	}
}
