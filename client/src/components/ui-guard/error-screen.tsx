import { Overlay } from "~client/components/overlay/index.tsx";

export class ErrorScreen {
	#isShown = false;

	show(message: string) {
		if (this.#isShown) {
			return;
		}

		Overlay.open({
			className: "ui-guard-error-screen",
			Content: () => (
				<div class="ui-guard-error-screen__content">
					<div class="ui-guard-error-screen__content-error-message">{message}</div>
					<div>
						...and unfortunatelly there is nothing we could do with it.<br />Please, try to reload the
						page...
					</div>
				</div>
			),
		});

		this.#isShown = true;
	}
}
