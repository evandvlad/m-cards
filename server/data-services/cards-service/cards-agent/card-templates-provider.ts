import { join } from "@std/path/join";
import { parse, stringify, type XmlElement } from "@std/xml";

import { AppError, assert, assertNonNullable } from "~shared/lib/error/index.ts";
import { isFilledString } from "~shared/lib/value-predicates/index.ts";
import { cardTemplateIdAttrName } from "~shared/data-values/files/index.ts";

import type { FsIo } from "~server/lib/fs-io.ts";

type Registry = Map<string, Map<string, string>>;

type Params = {
	baseFilepath: string;
	fsIo: FsIo;
};

export class CardTemplatesProvider {
	static #registry: Registry = new Map();

	#baseFilepath;
	#fsIo;

	constructor({ baseFilepath, fsIo }: Params) {
		this.#baseFilepath = baseFilepath;
		this.#fsIo = fsIo;
	}

	async getTemplate({ htmlPath, templateId }: { htmlPath: string; templateId: string }) {
		const filepath = join(this.#baseFilepath, "..", htmlPath);
		const registry = CardTemplatesProvider.#registry;

		if (!registry.has(filepath)) {
			const templates = await this.#getTemplates(filepath);
			registry.set(filepath, templates);
		}

		const template = registry.get(filepath)!.get(templateId);
		assertNonNullable(template, `Couldn't find a template with an id "${templateId}" in the file "${filepath}"`);

		return template;
	}

	async #getTemplates(filepath: string) {
		const content = await this.#getFileContent(filepath);
		return this.#parseTemplates({ content, filepath });
	}

	async #getFileContent(filepath: string) {
		try {
			return await this.#fsIo.readFile(filepath);
		} catch (e) {
			throw new AppError(`Couldn't read the file "${filepath}". Maybe it doesn't exist.`, {
				cause: e,
			});
		}
	}

	#parseTemplates({ content, filepath }: { content: string; filepath: string }) {
		try {
			const result = new Map();

			const nodes = parse(`<root>${content}</root>`).root.children;

			for (const node of nodes) {
				if (node.type !== "element" || node.name.local !== "template") {
					continue;
				}

				const id = node.attributes[cardTemplateIdAttrName];

				assert(
					isFilledString(id),
					`There is no "${cardTemplateIdAttrName}" attribute in the template in the file "${filepath}"`,
				);

				result.set(id, this.#extractContentFromXmlElement(node));
			}

			return result;
		} catch (e) {
			throw new AppError(`An error occurred while parsing the file "${filepath}"`, { cause: e });
		}
	}

	#extractContentFromXmlElement(element: XmlElement) {
		return element.children.map((childNode) => {
			const { type } = childNode;

			switch (type) {
				case "element":
					return stringify(childNode);

				case "text":
					return childNode.text;

				default:
					return "";
			}
		}).join("");
	}
}
