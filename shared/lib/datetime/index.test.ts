import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";

import { formatToDisplay, getDatetime } from "./index.ts";

describe("datetime", () => {
	it("get date time", () => {
		const datetime = getDatetime();
		expect(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(datetime)).toBe(true);
	});

	it("display format", () => {
		const datetime = formatToDisplay(new Date().toISOString());
		expect(/\d{2}\.\d{2}\.\d{4},\s\d{2}:\d{2}$/.test(datetime)).toBe(true);
	});
});
