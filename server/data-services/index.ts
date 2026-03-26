import type { Conf } from "~shared/conf.ts";

import type { FsIo } from "~server/lib/fs-io.ts";

import { CardsService } from "./cards-service/index.ts";

export type Services = {
	cardsService: CardsService;
};

type Params = {
	conf: Conf;
	fsIo: FsIo;
};

export function createServices({ conf, fsIo }: Params): Services {
	const cardsService = new CardsService({ conf, fsIo });

	return {
		cardsService,
	};
}
