import { join } from "@std/path/join";

import { createId } from "~shared/lib/id/index.ts";
import { getDatetime } from "~shared/lib/datetime/index.ts";
import { assertCardSet, type CardSet as FileCardSet } from "~shared/data-values/files/index.ts";
import type { CardSet } from "~shared/data-values/app.ts";

import type { FsIo } from "~server/lib/fs-io.ts";

import { FileAgent } from "../file-agent/index.ts";
import { CardsAgent } from "../cards-agent/index.ts";

type Params = {
	filepath: string;
	fsIo: FsIo;
};

export class CardSetAgent {
	id;

	#fileAgent;
	#cardSetAgents;

	static async create({ filepath, fsIo }: Params) {
		const fileAgent = await FileAgent.create<FileCardSet>({ filepath, dataAsserter: assertCardSet, fsIo });

		if (!fileAgent.data.meta) {
			await fileAgent.update({ meta: { id: createId(), registeredAt: getDatetime() } });
		}

		const { data } = fileAgent;

		const cardSetAgents = await Array.fromAsync(
			data.cards.map((path) => CardsAgent.create({ filepath: join(filepath, "..", path), fsIo })),
		);

		return new this({ fileAgent, cardSetAgents });
	}

	private constructor(
		{ fileAgent, cardSetAgents }: { fileAgent: FileAgent<FileCardSet>; cardSetAgents: CardsAgent[] },
	) {
		this.#fileAgent = fileAgent;
		this.#cardSetAgents = cardSetAgents;

		this.id = fileAgent.data.meta!.id;
	}

	getData(): CardSet {
		const { name, meta, randomCardSides = true } = this.#fileAgent.data;
		const { id, registeredAt } = meta!;

		return {
			id,
			name,
			registeredAt,
			randomCardSides,
			cards: this.#cardSetAgents.map((agent) => agent.getData()).flat(),
		};
	}
}
