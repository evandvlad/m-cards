import { Conf, type Params } from "~shared/conf.ts";

import { build as buildClient } from "@m-cards/client";
import { run as runServer } from "@m-cards/server";

export type { Params };

export async function run(params: Params): Promise<Deno.NetAddr> {
	const conf = new Conf(params);

	await buildClient({ conf });
	const addr = runServer({ conf });

	return addr;
}
