import { assertCardSets, type CardSets as FileCardSets } from "~shared/data-values/files/index.ts";
import type { CardSets } from "~shared/data-values/app.ts";

import type { FsIo } from "~server/lib/fs-io.ts";

import { FileAgent } from "../file-agent/index.ts";
import { CardSetAgent } from "../card-set-agent/index.ts";
import { resolveFilepath } from "../file-path-resolver/index.ts";

type Params = {
	filepath: string;
	fsIo: FsIo;
};

export class CardSetsAgent {
	#cardSetAgents;

	static async create({ filepath, fsIo }: Params) {
		const fileAgent = await FileAgent.create<FileCardSets>({ filepath, dataAsserter: assertCardSets, fsIo });

		const cardSetAgents = await Array.fromAsync(
			fileAgent.data.sets.map((path) =>
				CardSetAgent.create({ filepath: resolveFilepath({ base: filepath, relative: path }), fsIo })
			),
		);

		return new this({ cardSetAgents });
	}

	private constructor({ cardSetAgents }: { cardSetAgents: CardSetAgent[] }) {
		this.#cardSetAgents = cardSetAgents;
	}

	async getSets() {
		const result: CardSets = {
			items: await Array.fromAsync(this.#cardSetAgents.map((agent) => agent.getData())),
		};

		return result;
	}

	async findSetById(id: string) {
		const cardSetAgent = this.#cardSetAgents.find((agent) => agent.id === id);
		return cardSetAgent ? await cardSetAgent.getData() : null;
	}
}
