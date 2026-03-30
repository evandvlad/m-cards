import type { ComponentChildren } from "preact";

import { Button } from "~client/elements/button/index.tsx";
import CrossIcon from "~client/icons/cross.tsx";

type Props = {
	title: string;
	children: ComponentChildren;
	close: () => void;
};

export function Content({ title, close, children }: Props) {
	return (
		<div class="w-dialog__content">
			<header class="w-dialog__header">
				<h1>{title}</h1>
				<Button className="w-dialog__header-close-button" onClick={close}>
					<CrossIcon className="w-dialog__header-close-icon" />
				</Button>
			</header>
			<main class="w-dialog__main">{children}</main>
		</div>
	);
}
