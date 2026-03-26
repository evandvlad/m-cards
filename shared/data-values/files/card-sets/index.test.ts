import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";

import { assertCardSets } from "./index.ts";

describe("card-sets asserter", () => {
	it("not object", () => {
		expect(() => assertCardSets("", "E:")).toThrow(
			"E: Must be an object",
		);
	});

	it("empty object", () => {
		expect(() => assertCardSets({}, "E:")).toThrow(
			`E: There is no "version".`,
		);
	});

	it("no 'version'", () => {
		expect(() => assertCardSets({ sets: [] }, "E:")).toThrow(
			`E: There is no "version".`,
		);
	});

	it("no 'sets'", () => {
		expect(() => assertCardSets({ version: 1 }, "E:")).toThrow(
			`E: There is no "sets".`,
		);
	});

	it("'version' is not number", () => {
		expect(() => assertCardSets({ version: "1", sets: [] }, "E:")).toThrow(
			`E: The 'version' must be a positive integer.`,
		);
	});

	it("'version's value is incorrect", () => {
		expect(() => assertCardSets({ version: 0, sets: [] }, "E:")).toThrow(
			`E: The 'version' must be "1" instead of "0".`,
		);
	});

	it("'sets' is not array", () => {
		expect(() => assertCardSets({ version: 1, sets: {} }, "E:")).toThrow(
			`E: The "sets" is incorrect. Must be an array.`,
		);
	});

	it("'sets's item value is empty", () => {
		expect(() => assertCardSets({ version: 1, sets: [""] }, "E:")).toThrow(
			`E: The "sets" is incorrect. There is an item with incorrect file path - "".`,
		);
	});

	it("'sets's item value is incorrect", () => {
		expect(() => assertCardSets({ version: 1, sets: ["./foo.ts"] }, "E:"))
			.toThrow(
				`E: The "sets" is incorrect. There is an item with incorrect file path - "./foo.ts".`,
			);
	});

	it("success with empty paths", () => {
		expect(() => assertCardSets({ version: 1, sets: [] }, "")).not
			.toThrow();
	});

	it("success", () => {
		expect(() => assertCardSets({ version: 1, sets: ["../bar.json"] }, "")).not.toThrow();
	});
});
