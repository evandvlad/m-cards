import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";

import { assertCardSet } from "./index.ts";

describe("card-set asserter", () => {
	it("not object", () => {
		expect(() => assertCardSet("", "E:")).toThrow(
			"E: Must be an object",
		);
	});

	it("empty object", () => {
		expect(() => assertCardSet({}, "E:")).toThrow(
			`E: There is no "version".`,
		);
	});

	it("no 'version'", () => {
		expect(() => assertCardSet({ name: "foo", cards: [] }, "E:")).toThrow(
			`E: There is no "version".`,
		);
	});

	it("'version' is not number", () => {
		expect(() => assertCardSet({ version: "1", name: "foo", cards: [] }, "E:")).toThrow(
			`E: The 'version' must be a positive integer.`,
		);
	});

	it("'version's value is incorrect", () => {
		expect(() => assertCardSet({ version: 0, name: "foo", cards: [] }, "E:")).toThrow(
			`E: The 'version' must be "1" instead of "0".`,
		);
	});

	it("no 'name'", () => {
		expect(() => assertCardSet({ version: 1, cards: [] }, "E:")).toThrow(
			`E: There is no "name".`,
		);
	});

	it("'name' is empty", () => {
		expect(() => assertCardSet({ version: 1, name: "", cards: [] }, "E:")).toThrow(
			`E: The "name" must be a non-empty string.`,
		);
	});

	it("'name' is not string", () => {
		expect(() => assertCardSet({ version: 1, name: null, cards: [] }, "E:")).toThrow(
			`E: The "name" must be a non-empty string.`,
		);
	});

	it("no 'cards'", () => {
		expect(() => assertCardSet({ version: 1, name: "foo" }, "E:")).toThrow(
			`E: There is no "cards".`,
		);
	});

	it("success with the shortest version", () => {
		expect(() => assertCardSet({ version: 1, name: "foo", cards: [] }, "")).not
			.toThrow();
	});

	it("'cards' is not array", () => {
		expect(() => assertCardSet({ version: 1, name: "foo", cards: {} }, "E:")).toThrow(
			`E: The "cards" is incorrect. Must be an array.`,
		);
	});

	it("'cards's item value is empty", () => {
		expect(() => assertCardSet({ version: 1, name: "foo", cards: [""] }, "E:")).toThrow(
			`E: The "cards" is incorrect. There is an item with incorrect file path - "".`,
		);
	});

	it("'cards's item value is incorrect", () => {
		expect(() => assertCardSet({ version: 1, name: "foo", cards: ["./foo/bar.ts"] }, "E:"))
			.toThrow(
				`E: The "cards" is incorrect. There is an item with incorrect file path - "./foo/bar.ts".`,
			);
	});

	it("'randomCardSides' is not boolean", () => {
		expect(() => assertCardSet({ version: 1, name: "foo", cards: [], randomCardSides: "" }, "E:")).toThrow(
			`E: The "randomCardSides" must be a boolean or empty.`,
		);
	});

	it("'meta' is not object", () => {
		expect(() => assertCardSet({ version: 1, name: "foo", cards: [], meta: null }, "E:")).toThrow(
			`The "meta" is incorrect. Must be an object.`,
		);
	});

	it("no 'meta.id'", () => {
		expect(() =>
			assertCardSet({
				version: 1,
				name: "foo",
				cards: [],
				meta: { registeredAt: "2026-12-12T10:10:10.123Z" },
			}, "E:")
		).toThrow(
			`E: The "meta" is incorrect. There is no "id".`,
		);
	});

	it("'meta.id' is not string", () => {
		expect(() =>
			assertCardSet({
				version: 1,
				name: "foo",
				cards: [],
				meta: { id: {}, registeredAt: "2026-12-12T10:10:10.123Z" },
			}, "E:")
		).toThrow(
			`E: The "meta" is incorrect. The "id" must be a non-empty string.`,
		);
	});

	it("'meta.id' is empty string", () => {
		expect(() =>
			assertCardSet({
				version: 1,
				name: "foo",
				cards: [],
				meta: { id: "", registeredAt: "2026-12-12T10:10:10.123Z" },
			}, "E:")
		).toThrow(
			`E: The "meta" is incorrect. The "id" must be a non-empty string.`,
		);
	});

	it("no 'meta.registeredAt'", () => {
		expect(() => assertCardSet({ version: 1, name: "foo", cards: [], meta: { id: "foo" } }, "E:")).toThrow(
			`E: The "meta" is incorrect. There is no "registeredAt".`,
		);
	});

	it("'meta.registeredAt' is not string", () => {
		expect(() =>
			assertCardSet({ version: 1, name: "foo", cards: [], meta: { id: "foo", registeredAt: null } }, "E:")
		).toThrow(
			`E: The "meta" is incorrect. The "registeredAt" must be a 'YYYY-MM-DDTHH:mm:ss.sssZ' string.`,
		);
	});

	it("'meta.registeredAt' is empty string", () => {
		expect(() => assertCardSet({ version: 1, name: "foo", cards: [], meta: { id: "foo", registeredAt: "" } }, "E:"))
			.toThrow(
				`E: The "meta" is incorrect. The "registeredAt" must be a 'YYYY-MM-DDTHH:mm:ss.sssZ' string.`,
			);
	});

	it("'meta.registeredAt' value is incorrect", () => {
		expect(() =>
			assertCardSet(
				{ version: 1, name: "foo", cards: [], meta: { id: "foo", registeredAt: "2026-12-12" } },
				"E:",
			)
		)
			.toThrow(
				`E: The "meta" is incorrect. The "registeredAt" must be a 'YYYY-MM-DDTHH:mm:ss.sssZ' string.`,
			);
	});

	it("success with short version", () => {
		expect(() =>
			assertCardSet({
				version: 1,
				name: "foo",
				cards: [],
				meta: { id: "foo", registeredAt: "2026-12-12T10:10:10.123Z" },
			}, "")
		).not.toThrow();
	});

	it("success with full version", () => {
		expect(() =>
			assertCardSet({
				version: 1,
				name: "foo",
				cards: ["./baz.json"],
				randomCardSides: false,
				meta: {
					id: "foo",
					registeredAt: "2026-12-12T10:10:10.123Z",
				},
			}, "")
		).not.toThrow();
	});
});
