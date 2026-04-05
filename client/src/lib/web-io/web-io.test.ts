import { describe, it } from "@std/testing/bdd";
import { assertSpyCall, assertSpyCalls, spy } from "@std/testing/mock";
import { expect } from "@std/expect";

import { AppError, generalErrorMessage } from "~shared/lib/error/index.ts";

import { WebIo } from "./web-io.ts";

describe("web-io", () => {
	function createFixtures<T>({ result, isOk = true }: { result: T; isOk?: boolean }) {
		return {
			fetch: spy(() =>
				Promise.resolve({
					ok: isOk,
					json: () => Promise.resolve(result),
				} as Response)
			),
		};
	}

	it("get request - success", async () => {
		const fixtures = createFixtures({ result: { foo: "bar" } });
		const webIo = new WebIo(fixtures);

		const value = await webIo.get({ url: "/baz" });

		expect(value).toEqual({ foo: "bar" });
		assertSpyCall(fixtures.fetch, 0, {
			args: ["/baz", {}],
		});
	});

	it("get request with data - success", async () => {
		const fixtures = createFixtures({ result: { foo: "bar" } });
		const webIo = new WebIo(fixtures);

		const value = await webIo.get({ url: "/baz", data: { foo: "bar", qux: "quux" } });

		expect(value).toEqual({ foo: "bar" });
		assertSpyCall(fixtures.fetch, 0, {
			args: ["/baz?foo=bar&qux=quux", {}],
		});
	});

	it("get request - not ok response", async () => {
		const errorHandler = spy((e) => e);

		const fixtures = createFixtures({
			result: new Error("Oops"),
			isOk: false,
		});

		const webIo = new WebIo(fixtures);

		const value = await webIo.get({ url: "/qux/quux" }).catch(errorHandler);
		const { message } = value as Error;

		expect(value).toBeInstanceOf(AppError);
		expect(message).toBe(generalErrorMessage);

		assertSpyCalls(errorHandler, 1);
		assertSpyCall(fixtures.fetch, 0, {
			args: ["/qux/quux", {}],
		});
	});

	it("get request - not ok with the server friendly error response", async () => {
		const errorHandler = spy((e) => e);

		const fixtures = createFixtures({
			result: { isItServerFriendlyError: true, message: "It's a user friendly message" },
			isOk: false,
		});

		const webIo = new WebIo(fixtures);

		const value = await webIo.get({ url: "/qux/quux" }).catch(errorHandler);
		const { message } = value as Error;

		expect(value).toBeInstanceOf(AppError);
		expect(message).toBe("It's a user friendly message");

		assertSpyCalls(errorHandler, 1);
		assertSpyCall(fixtures.fetch, 0, {
			args: ["/qux/quux", {}],
		});
	});

	it("get request - not ok with the server friendly error response without a message (the general message will be used)", async () => {
		const errorHandler = spy((e) => e);

		const fixture = createFixtures({
			result: { isItServerFriendlyError: true, message: "" },
			isOk: false,
		});

		const webIo = new WebIo(fixture);

		const value = await webIo.get({ url: "/qux/quux" }).catch(errorHandler);
		const { message } = value as Error;

		expect(value).toBeInstanceOf(AppError);
		expect(message).toBe(generalErrorMessage);

		assertSpyCalls(errorHandler, 1);
		assertSpyCall(fixture.fetch, 0, {
			args: ["/qux/quux", {}],
		});
	});

	it("get request - not ok (early reject)", async () => {
		const errorHandler = spy((e) => e);
		const fetch = spy(() => Promise.reject(new Error("Error!!!")));

		const webIo = new WebIo({ fetch });

		const value = await webIo.get({ url: "/baz" }).catch(errorHandler);
		const { message } = value as Error;

		expect(value).toBeInstanceOf(AppError);
		expect(message).toBe(generalErrorMessage);

		assertSpyCalls(errorHandler, 1);
	});
});
