import { AppError } from "~shared/lib/error/index.ts";
import { hasProp, isObject } from "~shared/lib/value-predicates/index.ts";

import { assertVersion } from "../version/index.ts";
import { assertFilepaths } from "../filepaths/index.ts";

const version = 1;

export type CardSets = {
	version: number;
	sets: string[];
};

export function assertCardSets(data: unknown, baseMessage: string): asserts data is CardSets {
	if (!isObject(data)) {
		throw new AppError(`${baseMessage} Must be an object.`);
	}

	if (!hasProp(data, "version")) {
		throw new AppError(`${baseMessage} There is no "version".`);
	}

	assertVersion(data.version, { baseMessage, version });

	if (!hasProp(data, "sets")) {
		throw new AppError(`${baseMessage} There is no "sets".`);
	}

	assertFilepaths(data.sets, `${baseMessage} The "sets" is incorrect.`);
}
