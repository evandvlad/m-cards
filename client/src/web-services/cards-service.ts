import type { CardSet, CardSets } from "~shared/data-values/app.ts";

import type { WebIo } from "~client/lib/web-io/index.ts";

type Params = {
	webIo: WebIo;
};

export class CardsService {
	#webIo;

	constructor({ webIo }: Params) {
		this.#webIo = webIo;
	}

	getCardSets() {
		return this.#webIo.get<CardSets>({ url: "/api/card-sets" });
	}

	getCardSet(id: string) {
		return this.#webIo.get<CardSet>({ url: "/api/card-set", data: { id } });
	}
}
