type Props = {
	front: string;
	back?: string;
	isReversed: boolean;
};

export class ActiveCardViewModel {
	front;
	back;
	isReversed;

	constructor({ front, back, isReversed }: Props) {
		this.front = front;
		this.back = back;
		this.isReversed = isReversed;
	}
}
