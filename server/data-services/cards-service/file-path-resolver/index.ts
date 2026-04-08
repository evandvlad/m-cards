import { join } from "@std/path/join";

export function resolveFilepath({ base, relative }: { base: string; relative: string }) {
	return join(base, "..", relative);
}
