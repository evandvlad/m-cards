import { AppError } from "~shared/lib/error/index.ts";
import { isArray, isJsonFilepathString } from "~shared/lib/value-predicates/index.ts";

export function assertFilepaths(data: unknown, baseMessage: string): asserts data is string[] {
	if (!isArray(data)) {
		throw new AppError(`${baseMessage} Must be an array.`);
	}

	data.forEach((path) => {
		if (!isJsonFilepathString(path)) {
			throw new AppError(
				`${baseMessage} There is an item with incorrect file path - "${path}".`,
			);
		}
	});
}
