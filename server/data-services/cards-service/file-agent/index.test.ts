import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";

import { AppError } from "~shared/lib/error/index.ts";

import { FsIo } from "~server/testing/fs-io.ts";

import { FileAgent } from "./index.ts";

describe("file-agent", () => {
	function createFixtures() {
		const filepath = "/foo.json";
		const fsIo = new FsIo({ storage: { [filepath]: JSON.stringify({ foo: "bar", qux: "quux" }) } });

		return {
			fsIo,
			filepath,
			getStoredValue() {
				return JSON.parse(fsIo.storage[filepath]);
			},
			clearStorage() {
				fsIo.storage = {};
			},
		};
	}

	it("update data", async () => {
		const { fsIo, filepath, getStoredValue } = createFixtures();

		const agent = await FileAgent.create({ filepath, fsIo, dataAsserter() {} });

		expect(agent.data).toEqual(getStoredValue());

		const expected = { foo: "baz", qux: "quux" };
		await agent.update({ foo: "baz" });

		expect(agent.data).toEqual(expected);
		expect(getStoredValue()).toEqual(expected);
	});

	it("clear prop via partial update", async () => {
		const { fsIo, filepath, getStoredValue } = createFixtures();

		const agent = await FileAgent.create({ filepath, fsIo, dataAsserter() {} });

		expect(agent.data).toEqual(getStoredValue());

		const expected = { qux: "quux" };
		await agent.update({ foo: undefined });

		expect(agent.data).toEqual(expected);
		expect(getStoredValue()).toEqual(expected);
	});

	it("load non-existing file", async () => {
		const { fsIo } = createFixtures();

		await expect(FileAgent.create({ filepath: "/non-existing.json", fsIo, dataAsserter() {} })).rejects.toThrow(
			new AppError(`Couldn't read and process the file "/non-existing.json". Maybe it doesn't exist.`),
		);
	});

	it("update into non-existing file", async () => {
		const { fsIo, filepath, clearStorage } = createFixtures();

		const agent = await FileAgent.create({ filepath, fsIo, dataAsserter() {} });

		clearStorage();

		await expect(agent.update({ foo: "bar" })).rejects.toThrow(
			new AppError(`Couldn't process and write the file "/foo.json".`),
		);
	});

	it("assert incorrect data format on load", async () => {
		const { fsIo, filepath } = createFixtures();

		await expect(FileAgent.create({
			filepath,
			fsIo,
			dataAsserter(_, baseMessage) {
				throw new AppError(baseMessage);
			},
		})).rejects.toThrow(
			new AppError(`Incorrect data format in the file "/foo.json".`),
		);
	});

	it("assert incorrect data format on update", async () => {
		const { fsIo, filepath } = createFixtures();

		const agent = await FileAgent.create({
			filepath,
			fsIo,
			dataAsserter(data, baseMessage) {
				const isError = data && typeof data === "object" && "foo" in data && data.foo === "BAZ";
				if (isError) {
					throw new AppError(baseMessage);
				}
			},
		});

		await expect(agent.update({ foo: "BAZ" })).rejects.toThrow(
			new AppError(`Incorrect data format detected before updating the file "/foo.json".`),
		);
	});
});
