import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";

import type { Cards } from "~shared/data-values/files/index.ts";
import { createFileCards } from "~shared/testing/cards-data.ts";

import { FsIo } from "~server/testing/fs-io.ts";

import { CardsAgent } from "./index.ts";

describe("cards-agent", () => {
	it("all with meta", async () => {
		const filepath = "/foo.json";
		const fsIo = new FsIo({ storage: { [filepath]: JSON.stringify(createFileCards()) } });

		await CardsAgent.create({ filepath, fsIo });

		const data = JSON.parse(fsIo.storage[filepath]) as Cards;
		const areAllCardsWithMeta = data.cards.every((card) => Boolean(card.meta));

		expect(areAllCardsWithMeta).toBe(true);
	});

	it("no inactive cards", async () => {
		const filepath = "/bar.json";
		const data = createFileCards({ randomizeInvisibleCard: false });
		const fsIo = new FsIo({ storage: { [filepath]: JSON.stringify(data) } });

		const agent = await CardsAgent.create({ filepath, fsIo });

		expect(agent.getData().length).toBe(data.cards.length);
	});
});
