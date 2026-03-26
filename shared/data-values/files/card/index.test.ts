import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";

import { assertCard } from "./index.ts";

describe("card asserter", () => {
	it("not object", () => {
		expect(() => assertCard("", "E:")).toThrow(
			"E: Must be an object",
		);
	});

	it("empty object", () => {
		expect(() => assertCard({}, "E:")).toThrow(
			`E: There is no "name".`,
		);
	});

	it("no 'name'", () => {
		expect(() => assertCard({ front: "foo" }, "E:")).toThrow(
			`E: There is no "name".`,
		);
	});

	it("'name' is empty", () => {
		expect(() => assertCard({ name: "", front: "foo" }, "E:")).toThrow(
			`E: The "name" must be a non-empty string.`,
		);
	});

	it("'name' is not string", () => {
		expect(() => assertCard({ name: 123, front: "foo" }, "E:")).toThrow(
			`E: The "name" must be a non-empty string.`,
		);
	});

	it("no 'front'", () => {
		expect(() => assertCard({ name: "foo" }, "E:")).toThrow(
			`E: There is no "front".`,
		);
	});

	it("'front' is empty", () => {
		expect(() => assertCard({ name: "foo", front: "" }, "E:")).toThrow(
			`E: The "front" must be a non-empty string.`,
		);
	});

	it("'front' is not string", () => {
		expect(() => assertCard({ name: "foo", front: 555 }, "E:")).toThrow(
			`E: The "front" must be a non-empty string.`,
		);
	});

	it("'back' is empty", () => {
		expect(() => assertCard({ name: "foo", front: "bar", back: "" }, "E:")).toThrow(
			`E: The "back" must be a non-empty string or empty.`,
		);
	});

	it("'back' is not string", () => {
		expect(() => assertCard({ name: "foo", front: "bar", back: 999 }, "E:")).toThrow(
			`E: The "back" must be a non-empty string or empty.`,
		);
	});

	it("'inactive' is not boolean", () => {
		expect(() => assertCard({ name: "foo", front: "bar", inactive: 1 }, "E:")).toThrow(
			`E: The "inactive" must be a boolean or empty.`,
		);
	});

	it("success with short version without 'meta'", () => {
		expect(() => assertCard({ name: "foo", front: "bar" }, "")).not.toThrow();
	});

	it("'meta' is not object", () => {
		expect(() => assertCard({ name: "foo", front: "bar", meta: null }, "E:")).toThrow(
			`The "meta" is incorrect. Must be an object.`,
		);
	});

	it("no 'meta.id'", () => {
		expect(() =>
			assertCard({ name: "foo", front: "bar", meta: { registeredAt: "2026-12-12T10:10:10.123Z" } }, "E:")
		).toThrow(
			`E: The "meta" is incorrect. There is no "id".`,
		);
	});

	it("'meta.id' is not string", () => {
		expect(() =>
			assertCard({ name: "foo", front: "bar", meta: { id: {}, registeredAt: "2026-12-12T10:10:10.123Z" } }, "E:")
		).toThrow(
			`E: The "meta" is incorrect. The "id" must be a non-empty string.`,
		);
	});

	it("'meta.id' is empty string", () => {
		expect(() =>
			assertCard({ name: "foo", front: "bar", meta: { id: "", registeredAt: "2026-12-12T10:10:10.123Z" } }, "E:")
		).toThrow(
			`E: The "meta" is incorrect. The "id" must be a non-empty string.`,
		);
	});

	it("no 'meta.registeredAt'", () => {
		expect(() => assertCard({ name: "foo", front: "bar", meta: { id: "foo" } }, "E:")).toThrow(
			`E: The "meta" is incorrect. There is no "registeredAt".`,
		);
	});

	it("'meta.registeredAt' is not string", () => {
		expect(() => assertCard({ name: "foo", front: "bar", meta: { id: "foo", registeredAt: null } }, "E:")).toThrow(
			`E: The "meta" is incorrect. The "registeredAt" must be a 'YYYY-MM-DDTHH:mm:ss.sssZ' string.`,
		);
	});

	it("'meta.registeredAt' is empty string", () => {
		expect(() => assertCard({ name: "foo", front: "bar", meta: { id: "foo", registeredAt: "" } }, "E:")).toThrow(
			`E: The "meta" is incorrect. The "registeredAt" must be a 'YYYY-MM-DDTHH:mm:ss.sssZ' string.`,
		);
	});

	it("'meta.registeredAt' value is incorrect", () => {
		expect(() => assertCard({ name: "foo", front: "bar", meta: { id: "foo", registeredAt: "2026-12-12" } }, "E:"))
			.toThrow(
				`E: The "meta" is incorrect. The "registeredAt" must be a 'YYYY-MM-DDTHH:mm:ss.sssZ' string.`,
			);
	});

	it("success with short version", () => {
		expect(() =>
			assertCard({
				name: "foo",
				front: "bar",
				meta: {
					id: "foo",
					registeredAt: "2026-12-12T10:10:10.123Z",
				},
			}, "")
		).not.toThrow();
	});

	it("success with full version", () => {
		expect(() =>
			assertCard({
				name: "foo",
				front: "bar",
				back: "baz",
				inactive: false,
				meta: {
					id: "foo",
					registeredAt: "2026-12-12T10:10:10.123Z",
				},
			}, "")
		).not.toThrow();
	});
});
