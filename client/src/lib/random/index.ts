import { assert } from "~shared/lib/error/index.ts";

function randomInt(max: number) {
	return Math.floor(Math.random() * max);
}

export function randomBoolean() {
	return randomItemInArray([true, false]);
}

export function randomItemInArray<T>(array: T[]) {
	assert(array.length > 0, `Can't get a random item from an empty array.`);
	return array.at(randomInt(array.length)) as T;
}
