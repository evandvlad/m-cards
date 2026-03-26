import type { ComponentType } from "preact";

import { classes } from "~client/lib/css-classes/index.ts";
import { Overlay } from "~client/components/overlay/index.tsx";

import { DialogContent } from "./dialig-content.tsx";

import "./index.css";

type ContentComponentProps = { close: () => void };
type ContentComponent = ComponentType<ContentComponentProps>;

type Params = {
	title: string;
	className?: string;
	Content: ContentComponent;
};

export class Dialog {
	uponClose: Promise<void>;

	#overlay: Overlay | null;

	static open(params: Params) {
		return new this(params);
	}

	private constructor({ title, Content, className = "" }: Params) {
		this.#overlay = Overlay.open({
			className: classes("dialog", className),
			Content: ({ close }) => (
				<DialogContent title={title} close={close}>
					<Content close={close} />
				</DialogContent>
			),
		});

		this.uponClose = this.#overlay.uponClose;
	}

	close = () => {
		if (!this.#overlay) {
			return;
		}

		this.#overlay.close();
		this.#overlay = null;
	};
}
