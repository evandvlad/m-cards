import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";

import { assertVersion } from "./index.ts";

describe("api-version asserter", () => {
	it("not number", () => {
		expect(() => assertVersion(undefined, { baseMessage: "E:", version: 1 })).toThrow(
			"E: The 'version' must be a positive integer.",
		);
	});

	it("not positive integer", () => {
		expect(() => assertVersion(-5, { baseMessage: "E:", version: 1 })).toThrow(
			"E: The 'version' must be a positive integer.",
		);
	});

	it("is different from the current API version", () => {
		expect(() => assertVersion(1, { baseMessage: "E:", version: 2 })).toThrow(
			`E: The 'version' must be "2" instead of "1".`,
		);
	});

	it("success", () => {
		expect(() => assertVersion(1, { baseMessage: "", version: 1 })).not.toThrow();
	});
});
