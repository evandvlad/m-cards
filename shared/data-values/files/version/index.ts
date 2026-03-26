import { AppError } from "~shared/lib/error/index.ts";
import { isUInteger } from "~shared/lib/value-predicates/index.ts";

type Params = {
	baseMessage: string;
	version: number;
};

export function assertVersion(data: unknown, { baseMessage, version }: Params): asserts data is number {
	if (!isUInteger(data)) {
		throw new AppError(`${baseMessage} The 'version' must be a positive integer.`);
	}

	if (data !== version) {
		throw new AppError(`${baseMessage} The 'version' must be "${version}" instead of "${data}".`);
	}
}
