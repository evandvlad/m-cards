export type CardSide = {
	value: string;
	isHtml: boolean;
};

export type Card = {
	id: string;
	registeredAt: string;
	name: string;
	front: CardSide;
	back?: CardSide;
};

export type CardSet = {
	id: string;
	name: string;
	randomCardSides: boolean;
	cards: Card[];
	registeredAt: string;
};

export type CardSets = {
	items: CardSet[];
};
