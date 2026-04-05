import { generalErrorMessage, isAppError, type ServerFriendlyError } from "~shared/lib/error/index.ts";

function createError({ message, status }: { message: string; status: number }) {
	const error: ServerFriendlyError = {
		isItServerFriendlyError: true,
		message,
	};

	return Response.json(error, { status });
}

export function createRequestMappingError() {
	return createError({ message: "Can't find an API resource with this URL and HTTP method.", status: 404 });
}

export function createInternalServerError(e: unknown) {
	const message = isAppError(e) ? e.message : generalErrorMessage;
	return createError({ message, status: 500 });
}

export function createEntityNotFoundError(id: string) {
	return createError({ message: `Can't find an entity with the id "${id}"`, status: 404 });
}

export function createBadRequestError(message: string) {
	return createError({ message, status: 400 });
}
