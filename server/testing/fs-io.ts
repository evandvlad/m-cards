import type { FsIo as IFsIo } from "~server/lib/fs-io.ts";

type Params = {
	storage: Record<string, string>;
};

export class FsIo implements IFsIo {
	storage;

	constructor({ storage }: Params) {
		this.storage = storage;
	}

	readFile = (filepath: string) => {
		if (!Object.hasOwn(this.storage, filepath)) {
			return Promise.reject(new Error(`Test fsIo: There is no data by the path "${filepath}"`));
		}

		return Promise.resolve(this.storage[filepath]);
	};

	writeFile = (filepath: string, content: string) => {
		if (!Object.hasOwn(this.storage, filepath)) {
			return Promise.reject(new Error(`Test fsIo: There is no data by the path "${filepath}"`));
		}

		this.storage[filepath] = content;

		return Promise.resolve();
	};
}
