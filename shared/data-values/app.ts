export type Card = {
	id: string;
	name: string;
	front: string;
	registeredAt: string;
	back?: string;
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
