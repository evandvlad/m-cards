import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";

import { createFileCards, createFileCardSet, createFileCardSets } from "~shared/testing/cards-data.ts";

import { FsIo } from "~server/testing/fs-io.ts";

import { CardSetsAgent } from "./index.ts";

describe("card-sets-agent", () => {
	it("with sets", async () => {
		const filepath = "/foo/bar.json";
		const fsIo = new FsIo({
			storage: {
				[filepath]: JSON.stringify(createFileCardSets({ sets: ["./sets/qux.json", "./sets/quux.json"] })),
				"/foo/sets/qux.json": JSON.stringify(createFileCardSet({ cards: [] })),
				"/foo/sets/quux.json": JSON.stringify(createFileCardSet({ cards: ["./quux-cards.json"] })),
				"/foo/sets/quux-cards.json": JSON.stringify(createFileCards()),
			},
		});

		const agent = await CardSetsAgent.create({ filepath, fsIo });
		const { items } = await agent.getSets();

		expect(items.length).toBe(2);
	});

	it("find by id", async () => {
		const filepath = "/foo/bar.json";
		const setFilepath = "/foo/sets/qux.json";
		const fsIo = new FsIo({
			storage: {
				[filepath]: JSON.stringify(createFileCardSets({ sets: ["./sets/qux.json"] })),
				[setFilepath]: JSON.stringify(createFileCardSet({ cards: [] })),
			},
		});

		const agent = await CardSetsAgent.create({ filepath, fsIo });

		expect(await agent.findSetById("11111")).toBe(null);

		const setId = JSON.parse(fsIo.storage[setFilepath]).meta.id;
		const cardSet = await agent.findSetById(setId);

		expect(setId).toBe(cardSet!.id);
	});
});
