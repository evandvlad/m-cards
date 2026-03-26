import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";

import { classes } from "./index.ts";

describe("css-classes", () => {
	it("classes", () => {
		const classNames = classes("foo", null, { "bar": true, "baz": false }, undefined, "", "qux");
		expect(classNames).toBe("foo bar qux");
	});
});
