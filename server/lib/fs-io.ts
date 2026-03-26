export class FsIo {
	readFile(filepath: string) {
		return Deno.readTextFile(filepath);
	}

	writeFile(filepath: string, content: string) {
		return Deno.writeTextFile(filepath, content);
	}
}
