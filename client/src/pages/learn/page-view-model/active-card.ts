type Props = {
	front: string;
	back?: string;
};

export class ActiveCard {
	front;
	back;

	constructor({ front, back }: Props) {
		this.front = front;
		this.back = back;
	}
}
