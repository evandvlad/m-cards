import { type ComponentType, render } from "preact";

import { classes } from "~client/lib/css-classes/index.ts";

import "./index.css";

const shownClassNameForBody = "hide-scrolls";

type ContentComponentProps = { close: () => void };
type ContentComponent = ComponentType<ContentComponentProps>;

type Params = {
	className?: string;
	Content: ContentComponent;
};

export class Overlay {
	uponClose: Promise<void>;

	#element: HTMLDialogElement | null;
	#closeResolver: () => void;

	static open(params: Params) {
		return new this(params);
	}

	private constructor({ Content, className }: Params) {
		this.#element = this.#createElement({ className });

		const { promise, resolve } = Promise.withResolvers<void>();

		this.uponClose = promise;
		this.#closeResolver = resolve;

		render(<Content close={this.close} />, this.#element);

		const { body } = document;

		body.append(this.#element);
		body.classList.add(shownClassNameForBody);

		this.#element.showModal();
	}

	close = () => {
		if (!this.#element) {
			return;
		}

		document.body.classList.remove(shownClassNameForBody);

		this.#element.close();
		this.#element.remove();

		this.#element = null;
		this.#closeResolver();
	};

	#createElement({ className = "" }: { className?: string }) {
		const element = document.createElement("dialog");

		element.className = classes("overlay", className);
		element.setAttribute("closedby", "none");

		return element;
	}
}
