import { Overlay } from "~client/components/overlay/index.tsx";

export class Loader {
	#overlay: Overlay | null = null;
	#operationsCount = 0;

	async withLoader<T>(operation: () => Promise<T>): Promise<T> {
		if (!this.#overlay) {
			this.#overlay = Overlay.open({
				className: "ui-guard-loader-screen",
				Content: () => <div class="ui-guard-loader-screen__loader"></div>,
			});
		}

		this.#operationsCount += 1;

		try {
			return await operation();
		} finally {
			this.#operationsCount -= 1;

			if (this.#operationsCount === 0 && this.#overlay) {
				this.#overlay.close();
				this.#overlay = null;
			}
		}
	}
}
