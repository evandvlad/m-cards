import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";

import type { CardSet } from "~shared/data-values/files/index.ts";
import { createFileCards, createFileCardSet } from "~shared/testing/cards-data.ts";

import { FsIo } from "~server/testing/fs-io.ts";

import { CardSetAgent } from "./index.ts";

describe("card-set-agent", () => {
	it("with meta", async () => {
		const filepath = "/foo.json";
		const fsIo = new FsIo({
			storage: { [filepath]: JSON.stringify(createFileCardSet({ cards: [], useMeta: "no" })) },
		});

		await CardSetAgent.create({ filepath, fsIo });

		const data = JSON.parse(fsIo.storage[filepath]) as CardSet;

		expect(data.meta).toBeDefined();
	});

	it("with cards", async () => {
		const filepath = "/foo/bar.json";
		const cardsData = createFileCards({ randomizeInvisibleCard: false });
		const fsIo = new FsIo({
			storage: {
				[filepath]: JSON.stringify(createFileCardSet({ cards: ["./baz.json"] })),
				"/foo/baz.json": JSON.stringify(cardsData),
			},
		});

		const agent = await CardSetAgent.create({ filepath, fsIo });

		expect(agent.getData().cards.length).toBe(cardsData.cards.length);
	});
});
