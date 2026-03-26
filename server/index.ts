import { serveDir } from "@std/http/file-server";

import type { Conf } from "~shared/conf.ts";
import { pageNotFoundUrl } from "~shared/page-urls.ts";

import { createInternalServerError } from "~server/lib/error-responses.ts";
import { FsIo } from "~server/lib/fs-io.ts";
import { App } from "~server/app/index.ts";

type Params = {
	conf: Conf;
};

export function run({ conf }: Params) {
	const { hostname, port, publicDir } = conf;

	const fsIo = new FsIo();
	const app = new App({ conf, fsIo });

	const { addr } = Deno.serve({ hostname, port }, async (request) => {
		if (app.isRequestMatched(request)) {
			try {
				return await app.handleRequest(request);
			} catch (e) {
				console.error(e);
				return createInternalServerError(e);
			}
		}

		const response = await serveDir(request, {
			fsRoot: publicDir,
		});

		if (response.status === 404) {
			const acceptHeader = request.headers.get("Accept");

			if (acceptHeader?.includes("text/html")) {
				const newUrl = [new URL(request.url).origin, pageNotFoundUrl].join("");
				return Response.redirect(newUrl);
			}
		}

		return response;
	});

	return addr;
}
