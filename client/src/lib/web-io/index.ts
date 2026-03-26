import { WebIo } from "./web-io.ts";

export type { WebIo };

export function createWebIo() {
	return new WebIo({ fetch: fetch.bind(window) });
}
