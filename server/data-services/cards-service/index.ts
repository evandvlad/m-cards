import type { Conf } from "~shared/conf.ts";

import type { FsIo } from "~server/lib/fs-io.ts";

import { CardSetsAgent } from "./card-sets-agent/index.ts";

type Params = {
	conf: Conf;
	fsIo: FsIo;
};

export class CardsService {
	#cardSetsAgentRetriever;

	constructor({ conf, fsIo }: Params) {
		this.#cardSetsAgentRetriever = this.#createCardSetsAgentRetriever({ conf, fsIo });
	}

	async getSets() {
		const cardSetsAgent = await this.#cardSetsAgentRetriever.get();
		return cardSetsAgent.getSets();
	}

	async findSetById(id: string) {
		const cardSetsAgent = await this.#cardSetsAgentRetriever.get();
		return cardSetsAgent.findSetById(id);
	}

	#createCardSetsAgentRetriever({ conf, fsIo }: {
		conf: Conf;
		fsIo: FsIo;
	}) {
		let cardSetsAgent: CardSetsAgent | null = null;

		return {
			async get() {
				if (cardSetsAgent) {
					return cardSetsAgent;
				}

				cardSetsAgent = await CardSetsAgent.create({
					filepath: conf.cardSetsDataFilepath,
					fsIo,
				});

				return cardSetsAgent;
			},
		};
	}
}
