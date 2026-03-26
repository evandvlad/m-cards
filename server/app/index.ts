import type { Conf } from "~shared/conf.ts";

import type { FsIo } from "~server/lib/fs-io.ts";
import { createServices } from "~server/data-services/index.ts";
import { createControllers } from "~server/controllers/index.ts";
import { createRequestMappingError } from "~server/lib/error-responses.ts";

type Route = {
	method: "GET" | "POST";
	urlPattern: URLPattern;
	handler: (request: Request) => Promise<Response>;
};

type Params = {
	conf: Conf;
	fsIo: FsIo;
};

export class App {
	#routes: Route[];

	constructor({ conf, fsIo }: Params) {
		const { cardsController } = createControllers({ services: createServices({ conf, fsIo }) });

		this.#routes = [
			{
				method: "GET",
				urlPattern: new URLPattern({ pathname: "/api/card-sets" }),
				handler: cardsController.getSets,
			},
			{
				method: "GET",
				urlPattern: new URLPattern({ pathname: "/api/card-set" }),
				handler: cardsController.getSet,
			},
		];
	}

	isRequestMatched(request: Request) {
		const { pathname } = new URL(request.url);
		return pathname.startsWith("/api/");
	}

	handleRequest(request: Request) {
		for (const route of this.#routes) {
			if (request.method === route.method && route.urlPattern.test(request.url)) {
				return route.handler(request);
			}
		}

		return createRequestMappingError();
	}
}
