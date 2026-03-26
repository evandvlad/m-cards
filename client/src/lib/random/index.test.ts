import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";

import { randomInt } from "./index.ts";

describe("random", () => {
	it("random intenger", () => {
		const values = Array(10).fill(null).map(() => randomInt(3));
		const expectedValues = new Set([0, 1, 2]);

		const areValuesOk = values.every((val) => expectedValues.has(val));

		expect(areValuesOk).toBe(true);
	});
});
