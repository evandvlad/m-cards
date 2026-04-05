import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";

import { AppError, assert, assertNonNullable, isAppError, isServerFriendlyError } from "./index.ts";

describe("error", () => {
	describe("app-error", () => {
		it("correct name and instanceof", () => {
			const e = new AppError("Error");

			expect(e.name).toBe("AppError");
			expect(e).toBeInstanceOf(Error);
			expect(e).toBeInstanceOf(AppError);
		});

		it("isAppError", () => {
			expect(isAppError(new Error(""))).toBe(false);
			expect(isAppError(new AppError(""))).toBe(true);
		});
	});

	describe("assert", () => {
		it("no error", () => {
			expect(() => {
				assert(true, "");
			}).not.toThrow();
		});

		it("no error for non-boolean value", () => {
			expect(() => {
				assert({}, "");
			}).not.toThrow();
		});

		it("throw error for false", () => {
			expect(() => {
				assert(false, "It's false");
			}).toThrow(new AppError("It's false"));
		});

		it("throw error for falsy value", () => {
			expect(() => {
				assert("", "It's falsy value");
			}).toThrow(new AppError("It's falsy value"));
		});
	});

	describe("assert-non-nullable", () => {
		it("no error", () => {
			expect(() => {
				assertNonNullable("", "");
			}).not.toThrow();
		});

		it("throw error for null", () => {
			expect(() => {
				assertNonNullable(null, "Oops it's null");
			}).toThrow(new AppError("Oops it's null"));
		});

		it("throw error for undefined", () => {
			expect(() => {
				assertNonNullable(undefined, "Oops it's undefined");
			}).toThrow(new AppError("Oops it's undefined"));
		});
	});

	describe("is-server-friendly-error", () => {
		it("server friendly error", () => {
			expect(isServerFriendlyError({ isItServerFriendlyError: true, message: "Foo" })).toBe(true);
		});

		it("not server friendly error", () => {
			expect(isServerFriendlyError(null)).toBe(false);
			expect(isServerFriendlyError(new AppError("foo"))).toBe(false);
			expect(isServerFriendlyError("Foo")).toBe(false);
			expect(isServerFriendlyError({})).toBe(false);
			expect(isServerFriendlyError({ isItServerFriendlyError: false, message: "Foo" })).toBe(false);
			expect(isServerFriendlyError({ isItServerFriendlyError: true })).toBe(false);
			expect(isServerFriendlyError({ isItServerFriendlyError: true, message: 123 })).toBe(false);
			expect(isServerFriendlyError({ isItServerFriendlyError: true, message: "" })).toBe(false);
		});
	});
});
