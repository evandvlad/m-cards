import { join } from "@std/path/join";

import { assertCardSets, type CardSets as FileCardSets } from "~shared/data-values/files/index.ts";
import type { CardSets } from "~shared/data-values/app.ts";

import type { FsIo } from "~server/lib/fs-io.ts";

import { FileAgent } from "../file-agent/index.ts";
import { CardSetAgent } from "../card-set-agent/index.ts";

type Params = {
	filepath: string;
	fsIo: FsIo;
};

export class CardSetsAgent {
	#cardSetAgents;

	static async create({ filepath, fsIo }: Params) {
		const fileAgent = await FileAgent.create<FileCardSets>({ filepath, dataAsserter: assertCardSets, fsIo });

		const cardSetAgents = await Array.fromAsync(
			fileAgent.data.sets.map((path) => CardSetAgent.create({ filepath: join(filepath, "..", path), fsIo })),
		);

		return new this({ cardSetAgents });
	}

	private constructor({ cardSetAgents }: { cardSetAgents: CardSetAgent[] }) {
		this.#cardSetAgents = cardSetAgents;
	}

	getSets(): CardSets {
		return {
			items: this.#cardSetAgents.map((agent) => agent.getData()),
		};
	}

	findSetById(id: string) {
		const cardSetAgent = this.#cardSetAgents.find((agent) => agent.id === id);
		return cardSetAgent?.getData() ?? null;
	}
}
