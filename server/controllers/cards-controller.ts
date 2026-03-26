import type { Services } from "~server/data-services/index.ts";
import { createBadRequestError, createEntityNotFoundError } from "~server/lib/error-responses.ts";

export class CardsController {
	#cardsService;

	constructor({ cardsService }: Services) {
		this.#cardsService = cardsService;
	}

	getSets = async () => {
		const data = await this.#cardsService.getSets();
		return Response.json(data);
	};

	getSet = async (request: Request) => {
		const id = new URL(request.url).searchParams.get("id");

		if (!id) {
			return createBadRequestError(`An incorrect request, an id parameter wasn't passed.`);
		}

		const data = await this.#cardsService.findSetById(id);

		if (!data) {
			return createEntityNotFoundError(id);
		}

		return Response.json(data);
	};
}
