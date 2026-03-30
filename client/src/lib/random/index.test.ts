import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";

import { randomBoolean, randomItemInArray } from "./index.ts";

describe("random", () => {
	it("random item in array", () => {
		const values = [1, 7, 78, 12];
		const randomValues = Array(10).fill(null).map(() => randomItemInArray(values));

		const areValuesOk = randomValues.every((val) => values.includes(val));

		expect(areValuesOk).toBe(true);
	});

	it("exemption on getting random item from empty array", () => {
		expect(() => {
			randomItemInArray([]);
		}).toThrow("Can't get a random item from an empty array.");
	});

	it("random boolean", () => {
		const values = Array(10).fill(null).map(() => randomBoolean());
		const expectedValues = new Set([true, false]);

		const areValuesOk = values.every((val) => expectedValues.has(val));

		expect(areValuesOk).toBe(true);
	});
});
