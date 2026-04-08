import { createId } from "~shared/lib/id/index.ts";
import { getDatetime } from "~shared/lib/datetime/index.ts";
import { assertCardSet, type CardSet as FileCardSet } from "~shared/data-values/files/index.ts";
import type { CardSet } from "~shared/data-values/app.ts";

import type { FsIo } from "~server/lib/fs-io.ts";

import { FileAgent } from "../file-agent/index.ts";
import { CardsAgent } from "../cards-agent/index.ts";
import { resolveFilepath } from "../file-path-resolver/index.ts";

type Params = {
	filepath: string;
	fsIo: FsIo;
};

export class CardSetAgent {
	id;

	#fileAgent;
	#cardsAgents;

	static async create({ filepath, fsIo }: Params) {
		const fileAgent = await FileAgent.create<FileCardSet>({ filepath, dataAsserter: assertCardSet, fsIo });

		if (!fileAgent.data.meta) {
			await fileAgent.update({ meta: { id: createId(), registeredAt: getDatetime() } });
		}

		const { data } = fileAgent;

		const cardsAgents = await Array.fromAsync(
			data.cards.map((path) =>
				CardsAgent.create({ filepath: resolveFilepath({ base: filepath, relative: path }), fsIo })
			),
		);

		return new this({ fileAgent, cardsAgents });
	}

	private constructor(
		{ fileAgent, cardsAgents }: { fileAgent: FileAgent<FileCardSet>; cardsAgents: CardsAgent[] },
	) {
		this.#fileAgent = fileAgent;
		this.#cardsAgents = cardsAgents;

		this.id = fileAgent.data.meta!.id;
	}

	async getData() {
		const { name, meta, randomCardSides = true } = this.#fileAgent.data;
		const { id, registeredAt } = meta!;

		const cards = (await Array.fromAsync(this.#cardsAgents.map((agent) => agent.getData()))).flat(1);

		const result: CardSet = {
			id,
			name,
			registeredAt,
			randomCardSides,
			cards,
		};

		return result;
	}
}
