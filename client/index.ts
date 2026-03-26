import { join } from "@std/path/join";
import { copy } from "@std/fs/copy";
import { exists } from "@std/fs/exists";

import type { Conf } from "~shared/conf.ts";

import { renderTemplate } from "./html-template.ts";

const dirName = import.meta.dirname!;
const pagesDir = join(dirName, "src/pages");
const imagesDir = join(dirName, "images");
const indexPageName = "main";

type Params = {
	conf: Conf;
};

export async function build({ conf }: Params) {
	const { publicDir } = conf;
	const doesPublicDirExist = await exists(publicDir, { isDirectory: true });

	if (doesPublicDirExist) {
		await Deno.remove(publicDir, { recursive: true });
	}

	const entries = await Array.fromAsync(Deno.readDir(pagesDir));
	const pageNames = entries.filter(({ isDirectory }) => isDirectory).map(({ name }) => name);

	await Promise.all([
		copy(imagesDir, join(publicDir, "images"), { overwrite: true }),
		...pageNames.map(async (name) => {
			const pageDir = join(pagesDir, name);
			const outputDir = name === indexPageName ? publicDir : join(publicDir, name);
			const scriptFile = join(pageDir, "index.tsx");

			const { errors } = await Deno.bundle({
				entrypoints: [scriptFile],
				platform: "browser",
				minify: true,
				outputDir,
			});

			if (errors.length > 0) {
				throw new Error(`${errors[0].text}`);
			}

			const htmlFile = join(outputDir, "index.html");

			await Deno.writeTextFile(htmlFile, renderTemplate(conf));
		}),
	]);
}
