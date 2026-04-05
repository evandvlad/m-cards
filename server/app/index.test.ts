import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";

import type { CardSet, CardSets } from "~shared/data-values/app.ts";
import { isServerFriendlyError } from "~shared/lib/error/index.ts";
import { Conf } from "~shared/conf.ts";
import { createFileCardSet, createFileCardSets } from "~shared/testing/cards-data.ts";

import { FsIo } from "~server/testing/fs-io.ts";

import { App } from "./index.ts";

describe("app", () => {
	const cardSetsDataFilepath = "/foo/card-sets.json";

	function createFixtures({ storage }: { storage?: Record<string, string> } = {}) {
		const fsIo = new FsIo({
			storage: storage ?? {
				[cardSetsDataFilepath]: JSON.stringify(createFileCardSets({ sets: [] })),
			},
		});

		const conf = new Conf({ cardSetsDataFilepath });

		return { fsIo, conf };
	}

	it("is request matched", () => {
		const fixtures = createFixtures();
		const app = new App(fixtures);

		expect(app.isRequestMatched(new Request("http://localhost/"))).toBe(false);
		expect(app.isRequestMatched(new Request("http://localhost/api"))).toBe(false);
		expect(app.isRequestMatched(new Request("http://localhost/api-foo"))).toBe(false);

		expect(app.isRequestMatched(new Request("http://localhost/api/"))).toBe(true);
		expect(app.isRequestMatched(new Request("http://localhost/api/foo"))).toBe(true);
		expect(app.isRequestMatched(new Request("http://localhost/api/foo/bar/baz?q=123"))).toBe(true);
	});

	it("get empty card-sets", async () => {
		const fixtures = createFixtures();
		const app = new App(fixtures);

		const request = new Request("http://localhost/api/card-sets");
		const response = await app.handleRequest(request);
		const data = await response.json() as CardSets;

		expect(data.items.length).toBe(0);
	});

	it("get non empty card-sets", async () => {
		const fixtures = createFixtures({
			storage: {
				[cardSetsDataFilepath]: JSON.stringify(
					createFileCardSets({ sets: ["./sets/foo.json", "./sets/bar.json"] }),
				),
				"/foo/sets/foo.json": JSON.stringify(createFileCardSet({ cards: [] })),
				"/foo/sets/bar.json": JSON.stringify(createFileCardSet({ cards: [] })),
			},
		});

		const app = new App(fixtures);

		const request = new Request("http://localhost/api/card-sets");
		const response = await app.handleRequest(request);
		const data = await response.json() as CardSets;

		expect(data.items.length).toBe(2);
	});

	it("get card-set by id", async () => {
		const fixtures = createFixtures({
			storage: {
				[cardSetsDataFilepath]: JSON.stringify(
					createFileCardSets({ sets: ["./sets/foo.json", "./sets/bar.json"] }),
				),
				"/foo/sets/foo.json": JSON.stringify(createFileCardSet({ cards: [] })),
				"/foo/sets/bar.json": JSON.stringify(createFileCardSet({ cards: [], useMeta: "yes" })),
			},
		});

		const app = new App(fixtures);
		const fileCardSet = JSON.parse(fixtures.fsIo.storage["/foo/sets/bar.json"]);

		const request = new Request(
			`http://localhost/api/card-set?${new URLSearchParams({ id: fileCardSet.meta.id })}`,
		);

		const response = await app.handleRequest(request);
		const data = await response.json() as CardSet;

		expect(data.id).toBe(fileCardSet.meta.id);
		expect(data.name).toBe(fileCardSet.name);
		expect(data.cards.length).toBe(0);
	});

	it("failure on get card-set without id", async () => {
		const fixtures = createFixtures();
		const app = new App(fixtures);

		const request = new Request("http://localhost/api/card-set");
		const response = await app.handleRequest(request);
		const data = await response.json();

		expect(isServerFriendlyError(data)).toBe(true);
		expect(data.message).toBe("An incorrect request, an id parameter wasn't passed.");
	});

	it("failure on get card-set with unkown id", async () => {
		const fixtures = createFixtures();
		const app = new App(fixtures);

		const request = new Request("http://localhost/api/card-set?id=unknown");
		const response = await app.handleRequest(request);
		const data = await response.json();

		expect(isServerFriendlyError(data)).toBe(true);
		expect(data.message).toBe(`Can't find an entity with the id "unknown"`);
	});

	it("request mapping error", async () => {
		const fixtures = createFixtures();
		const app = new App(fixtures);

		const response = await app.handleRequest(new Request("http://localhost/api/not-found"));
		const data = await response.json();

		expect(data).toEqual({
			isItServerFriendlyError: true,
			message: "Can't find an API resource with this URL and HTTP method.",
		});
	});
});
