import { createId } from "~shared/lib/id/index.ts";
import { getDatetime } from "~shared/lib/datetime/index.ts";
import { assertCards, type Card as FileCard, type Cards as FileCards } from "~shared/data-values/files/index.ts";
import type { Card, CardSide } from "~shared/data-values/app.ts";

import type { FsIo } from "~server/lib/fs-io.ts";

import { FileAgent } from "../file-agent/index.ts";

type Params = {
	filepath: string;
	fsIo: FsIo;
};

export class CardsAgent {
	#fileAgent;

	static async create({ filepath, fsIo }: Params) {
		const fileAgent = await FileAgent.create<FileCards>({ filepath, dataAsserter: assertCards, fsIo });

		const hasUnregisteredCards = fileAgent.data.cards.some(({ meta }) => !meta);

		if (hasUnregisteredCards) {
			const preparedCards = fileAgent.data.cards.map((card) => {
				if (card.meta) {
					return card;
				}

				card.meta = { id: createId(), registeredAt: getDatetime() };

				return card;
			});

			await fileAgent.update({
				cards: preparedCards,
			});
		}

		return new this({ fileAgent });
	}

	private constructor({ fileAgent }: { fileAgent: FileAgent<FileCards> }) {
		this.#fileAgent = fileAgent;
	}

	getData(): Card[] {
		return this.#fileAgent.data.cards
			.filter(({ inactive }) => !inactive)
			.map((fileCard) => this.#transformCard(fileCard));
	}

	#transformCard({ name, front, back, meta }: FileCard): Card {
		const { id, registeredAt } = meta!;

		return {
			id,
			name: name,
			front: this.#transformCardSide(front),
			back: typeof back !== "undefined" ? this.#transformCardSide(back) : undefined,
			registeredAt,
		};
	}

	#transformCardSide(fileCardSide: string): CardSide {
		return {
			value: fileCardSide,
			isHtml: false,
		};
	}
}
