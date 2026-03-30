import { Overlay } from "~client/widgets/overlay/index.tsx";

export class ErrorScreen {
	#isShown = false;

	show(message: string) {
		if (this.#isShown) {
			return;
		}

		Overlay.open({
			className: "w-ui-guard-error-screen",
			Content: () => (
				<div class="w-ui-guard-error-screen__content">
					<div class="w-ui-guard-error-screen__content-error-message">{message}</div>
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
