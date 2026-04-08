import { createId } from "~shared/lib/id/index.ts";
import { getDatetime } from "~shared/lib/datetime/index.ts";
import { isString } from "~shared/lib/value-predicates/index.ts";
import { assertNever } from "~shared/lib/error/index.ts";
import {
	assertCards,
	type Card as FileCard,
	type Cards as FileCards,
	type CardSide as FileCardSide,
} from "~shared/data-values/files/index.ts";
import type { Card, CardSide } from "~shared/data-values/app.ts";

import type { FsIo } from "~server/lib/fs-io.ts";

import { FileAgent } from "../file-agent/index.ts";
import { CardTemplatesProvider } from "./card-templates-provider.ts";

type Params = {
	filepath: string;
	fsIo: FsIo;
};

export class CardsAgent {
	#fileAgent;
	#cardTemplatesProvider;

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

		return new this({ fileAgent, fsIo });
	}

	private constructor({ fileAgent, fsIo }: { fileAgent: FileAgent<FileCards>; fsIo: FsIo }) {
		this.#fileAgent = fileAgent;
		this.#cardTemplatesProvider = new CardTemplatesProvider({ baseFilepath: fileAgent.filepath, fsIo });
	}

	async getData() {
		const activeFileCards = this.#fileAgent.data.cards.filter(({ inactive }) => !inactive);
		const result: Card[] = await Array.fromAsync(activeFileCards.map((fileCard) => this.#transformCard(fileCard)));

		return result;
	}

	async #transformCard({ name, front, back, meta }: FileCard) {
		const { id, registeredAt } = meta!;
		const hasBack = typeof back !== "undefined";

		const card: Card = {
			id,
			name: name,
			front: await this.#transformCardSide(front),
			back: hasBack ? await this.#transformCardSide(back) : undefined,
			registeredAt,
		};

		return card;
	}

	async #transformCardSide(fileCardSide: FileCardSide): Promise<CardSide> {
		if (isString(fileCardSide)) {
			return {
				value: fileCardSide,
				isHtml: false,
			};
		}

		const { type } = fileCardSide;

		switch (type) {
			case "internal":
				return {
					value: fileCardSide.value,
					isHtml: fileCardSide.isHtml,
				};

			case "external":
				return {
					value: await this.#cardTemplatesProvider.getTemplate(fileCardSide),
					isHtml: true,
				};

			default:
				assertNever(type);
		}
	}
}
