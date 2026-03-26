import { AppError, generalErrorMessage, isAppError, isServerFriendlyError } from "~shared/lib/error/index.ts";

function createAppError(cause: unknown) {
	const message = isServerFriendlyError(cause) ? cause.message : generalErrorMessage;
	return new AppError(message, { cause });
}

type GetParams = {
	url: string;
	data?: Record<string, string>;
};

type Params = {
	fetch: typeof fetch;
};

export class WebIo {
	#fetch;

	constructor({ fetch }: Params) {
		this.#fetch = fetch;
	}

	get = <T>({ url, data }: GetParams) => {
		let requestUrl = url;

		if (data) {
			const qParams = new URLSearchParams(data);
			requestUrl += `?${qParams}`;
		}

		return this.#makeRequest<T>(requestUrl);
	};

	async #makeRequest<T>(url: string, init: RequestInit = {}) {
		try {
			const response = await this.#fetch(url, init);
			const data = await response.json();

			if (!response.ok) {
				throw createAppError(data);
			}

			return data as T;
		} catch (e) {
			if (isAppError(e)) {
				throw e;
			}

			throw createAppError(e);
		}
	}
}
