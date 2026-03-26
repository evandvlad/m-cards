import { AppError } from "~shared/lib/error/index.ts";

import type { FsIo } from "~server/lib/fs-io.ts";

type Rec = Record<string, unknown>;
type DataAsserter = (data: unknown, baseMessage: string) => void;

type Params = {
	filepath: string;
	dataAsserter: DataAsserter;
	fsIo: FsIo;
};

export class FileAgent<T extends Rec = Rec> {
	filepath;
	data: T;

	#fsIo;
	#dataAsserter;

	static async create<T extends Rec>({
		filepath,
		dataAsserter,
		fsIo,
	}: Params) {
		const data = await this.#load({ filepath, fsIo });
		dataAsserter(data, `Incorrect data format in the file "${filepath}".`);

		return new this({ filepath, dataAsserter, fsIo, data: data as T });
	}

	static async #load({ filepath, fsIo }: { filepath: string; fsIo: FsIo }) {
		try {
			const content = await fsIo.readFile(filepath);
			return JSON.parse(content) as unknown;
		} catch (e) {
			throw new AppError(`Couldn't read and process the file "${filepath}". Maybe it doesn't exist.`, {
				cause: e,
			});
		}
	}

	private constructor(
		{ filepath, dataAsserter, data, fsIo }: { filepath: string; data: T; dataAsserter: DataAsserter; fsIo: FsIo },
	) {
		this.filepath = filepath;
		this.data = data;
		this.#dataAsserter = dataAsserter;
		this.#fsIo = fsIo;
	}

	async update(data: Partial<T>) {
		this.data = { ...this.data, ...data };

		this.#dataAsserter(this.data, `Incorrect data format detected before updating the file "${this.filepath}".`);

		try {
			const content = JSON.stringify(this.data, null, "\t");
			await this.#fsIo.writeFile(this.filepath, content);
		} catch (e) {
			throw new AppError(`Couldn't process and write the file "${this.filepath}".`, { cause: e });
		}
	}
}
