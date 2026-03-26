import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";

import { assertFilepaths } from "./index.ts";

describe("filepaths asserter", () => {
	it("not array", () => {
		expect(() => assertFilepaths({}, "Error:")).toThrow("Error: Must be an array.");
	});

	it("success with empty array", () => {
		expect(() => assertFilepaths([], "Error:")).not.toThrow();
	});

	it("item with empty string", () => {
		expect(() => assertFilepaths([""], "Error:")).toThrow(
			`Error: There is an item with incorrect file path - "".`,
		);
	});

	it("item is not path", () => {
		expect(() => assertFilepaths(["foo"], "Error:")).toThrow(
			`Error: There is an item with incorrect file path - "foo".`,
		);
	});

	it("item is not JSON path", () => {
		expect(() => assertFilepaths(["/foo/bar.ts"], "Error:")).toThrow(
			`Error: There is an item with incorrect file path - "/foo/bar.ts".`,
		);
	});

	it("success", () => {
		expect(() => assertFilepaths(["./foo.json"], "Error:")).not.toThrow();
	});
});
