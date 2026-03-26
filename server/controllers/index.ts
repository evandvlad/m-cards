import type { Services } from "~server/data-services/index.ts";

import { CardsController } from "./cards-controller.ts";

type Controllers = {
	cardsController: CardsController;
};

type Params = {
	services: Services;
};

export function createControllers({ services }: Params): Controllers {
	const { cardsService } = services;

	return {
		cardsController: new CardsController({ cardsService }),
	};
}
