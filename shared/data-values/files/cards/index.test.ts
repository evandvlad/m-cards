import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";

import { assertCards } from "./index.ts";

describe("cards asserter", () => {
	it("not object", () => {
		expect(() => assertCards("", "E:")).toThrow(
			"E: Must be an object",
		);
	});

	it("empty object", () => {
		expect(() => assertCards({}, "E:")).toThrow(
			`E: There is no "version".`,
		);
	});

	it("no 'version'", () => {
		expect(() => assertCards({ cards: [] }, "E:")).toThrow(
			`E: There is no "version".`,
		);
	});

	it("no 'cards'", () => {
		expect(() => assertCards({ version: 1 }, "E:")).toThrow(
			`E: There is no "cards".`,
		);
	});

	it("'version' is not number", () => {
		expect(() => assertCards({ version: "1", cards: [] }, "E:")).toThrow(
			`E: The 'version' must be a positive integer.`,
		);
	});

	it("'version's value is incorrect", () => {
		expect(() => assertCards({ version: 0, cards: [] }, "E:")).toThrow(
			`E: The 'version' must be "1" instead of "0".`,
		);
	});

	it("'cards' is not array", () => {
		expect(() => assertCards({ version: 1, cards: {} }, "E:")).toThrow(
			`E: The "cards" must be an array.`,
		);
	});

	it("success with empty paths", () => {
		expect(() => assertCards({ version: 1, cards: [] }, "")).not
			.toThrow();
	});

	it("success", () => {
		expect(() =>
			assertCards({
				version: 1,
				cards: [{
					name: "foo",
					front: "bar",
				}],
			}, "")
		).not.toThrow();
	});
});
