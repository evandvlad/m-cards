import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";

import { resolveFilepath } from "./index.ts";

describe("file-path-resolver", () => {
	it("resolves relative path from parent directory", () => {
		const result = resolveFilepath({
			base: "foo/bar/baz/index.json",
			relative: "./cards.json",
		});
		expect(result).toBe("foo/bar/baz/cards.json");
	});

	it("resolves relative path with nested directories", () => {
		const result = resolveFilepath({
			base: "foo/bar/baz/index.json",
			relative: "./data/cards.json",
		});
		expect(result).toBe("foo/bar/baz/data/cards.json");
	});

	it("resolves relative path going up multiple levels", () => {
		const result = resolveFilepath({
			base: "foo/bar/baz/index.json",
			relative: "../qux/meta.json",
		});
		expect(result).toBe("foo/bar/qux/meta.json");
	});

	it("handles simple base path without directory", () => {
		const result = resolveFilepath({
			base: "index.json",
			relative: "./cards.json",
		});
		expect(result).toBe("cards.json");
	});

	it("handles relative path without ./ prefix", () => {
		const result = resolveFilepath({
			base: "foo/bar/baz/index.json",
			relative: "cards.json",
		});
		expect(result).toBe("foo/bar/baz/cards.json");
	});
});
