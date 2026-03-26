import { isAbsolute, join } from "@std/path";

import denoJSON from "../deno.json" with { type: "json" };

const appDirPath = join(import.meta.dirname!, "..");

export type Params = {
	cardSetsDataFilepath: string;
	hostname?: string;
	port?: number;
};

export class Conf {
	appVersion;
	publicDir;
	cardSetsDataFilepath;
	hostname;
	port;

	constructor({ cardSetsDataFilepath, hostname, port }: Params) {
		this.appVersion = denoJSON.version;
		this.publicDir = join(appDirPath, "./public");

		this.cardSetsDataFilepath = isAbsolute(cardSetsDataFilepath)
			? cardSetsDataFilepath
			: join(appDirPath, cardSetsDataFilepath);

		this.hostname = hostname ?? "127.0.0.1";
		this.port = port ?? 63091;
	}
}
