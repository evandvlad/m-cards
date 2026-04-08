import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";

import {
	hasProp,
	isArray,
	isBoolean,
	isFilledString,
	isHtmlFilepathString,
	isIsoDatetimeString,
	isJsonFilepathString,
	isNonNullable,
	isObject,
	isOneOf,
	isString,
	isUInteger,
} from "./index.ts";

describe("value-predicates", () => {
	it("is string", () => {
		expect(isString(undefined)).toBe(false);
		expect(isString(null)).toBe(false);
		expect(isString({})).toBe(false);

		expect(isString("")).toBe(true);
		expect(isString(`foo`)).toBe(true);
		expect(isString("bar")).toBe(true);
	});

	it("is filled string", () => {
		expect(isFilledString("")).toBe(false);

		expect(isFilledString(" ")).toBe(true);
		expect(isFilledString("baz")).toBe(true);
	});

	it("is ISO datetime string", () => {
		expect(isIsoDatetimeString("")).toBe(false);
		expect(isIsoDatetimeString("Sun, 08 Mar 2026 12:47:34 GMT")).toBe(false);
		expect(isIsoDatetimeString("2026-12-12T10:10:10Z")).toBe(false);
		expect(isIsoDatetimeString("2026-12-12T10:10:10.123z")).toBe(false);

		expect(isIsoDatetimeString("2026-12-12T10:10:10.123Z")).toBe(true);
	});

	it("is JSON filepath string", () => {
		expect(isJsonFilepathString(undefined)).toBe(false);
		expect(isJsonFilepathString("")).toBe(false);
		expect(isJsonFilepathString("foo")).toBe(false);
		expect(isJsonFilepathString("./foo/bar")).toBe(false);
		expect(isJsonFilepathString("/foo/bar.jsonc")).toBe(false);
		expect(isJsonFilepathString(".json")).toBe(false);

		expect(isJsonFilepathString("1.json")).toBe(true);
		expect(isJsonFilepathString("/foo/bar.json")).toBe(true);
	});

	it("is HTML filepath string", () => {
		expect(isHtmlFilepathString(undefined)).toBe(false);
		expect(isHtmlFilepathString("")).toBe(false);
		expect(isHtmlFilepathString("foo")).toBe(false);
		expect(isHtmlFilepathString("./foo/bar")).toBe(false);
		expect(isHtmlFilepathString("/foo/bar.htm")).toBe(false);
		expect(isHtmlFilepathString(".html")).toBe(false);

		expect(isHtmlFilepathString("1.html")).toBe(true);
		expect(isHtmlFilepathString("/foo/bar.html")).toBe(true);
	});

	it("is uinteger", () => {
		expect(isUInteger(null)).toBe(false);
		expect(isUInteger(NaN)).toBe(false);
		expect(isUInteger(Infinity)).toBe(false);
		expect(isUInteger("12")).toBe(false);
		expect(isUInteger(1.5)).toBe(false);
		expect(isUInteger(-5)).toBe(false);

		expect(isUInteger(0)).toBe(true);
		expect(isUInteger(90.0)).toBe(true);
		expect(isUInteger(5)).toBe(true);
	});

	it("is boolean", () => {
		expect(isBoolean(undefined)).toBe(false);
		expect(isBoolean(0)).toBe(false);
		expect(isBoolean(new Boolean(true))).toBe(false);

		expect(isBoolean(true)).toBe(true);
		expect(isBoolean(false)).toBe(true);
	});

	it("is object", () => {
		expect(isObject(undefined)).toBe(false);
		expect(isObject(null)).toBe(false);
		expect(isObject(function () {})).toBe(false);
		expect(isObject(/\d/)).toBe(true);
		expect(isObject([])).toBe(false);

		expect(isObject({})).toBe(true);
		expect(isObject({ a: 12 })).toBe(true);
	});

	it("is array", () => {
		expect(isArray(undefined)).toBe(false);
		expect(isArray(null)).toBe(false);
		expect(isArray({})).toBe(false);
		expect(isArray({ length: 0 })).toBe(false);

		expect(isArray([])).toBe(true);
	});

	it("is non nullable", () => {
		expect(isNonNullable(undefined)).toBe(false);
		expect(isNonNullable(null)).toBe(false);

		expect(isNonNullable(0)).toBe(true);
		expect(isNonNullable(false)).toBe(true);
		expect(isNonNullable("")).toBe(true);
	});

	it("has prop", () => {
		expect(hasProp({}, "foo")).toBe(false);

		expect(hasProp({ foo: "bar" }, "foo")).toBe(true);
		expect(hasProp({}, "toString")).toBe(true);
		expect(hasProp([], "length")).toBe(true);
	});

	it("is one of", () => {
		expect(isOneOf("a", ["a", "b", "c"])).toBe(true);
		expect(isOneOf("b", ["a", "b", "c"])).toBe(true);
		expect(isOneOf("d", ["a", "b", "c"])).toBe(false);
		expect(isOneOf("", ["a", "b", "c"])).toBe(false);
	});
});
