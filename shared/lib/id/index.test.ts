import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";

import { createId } from "./index.ts";

describe("id", () => {
	function create1000ids() {
		return Array(1000).fill(null).map(() => createId());
	}

	it("uniq", () => {
		const set = new Set(create1000ids());
		expect(set.size).toBe(1000);
	});

	it("url safe", () => {
		const ids = create1000ids();
		const urlIds = ids.map((id) => {
			const urlSearchParams = new URLSearchParams({ id });
			return urlSearchParams.get("id");
		});

		expect(urlIds.toString()).toBe(ids.toString());
	});
});
