import type { ComponentChildren } from "preact";

import { Button } from "~client/components/button/index.tsx";
import CrossIcon from "~client/components/icons/cross.tsx";

type Props = {
	title: string;
	children: ComponentChildren;
	close: () => void;
};

export function DialogContent({ title, close, children }: Props) {
	return (
		<div class="dialog__content">
			<header class="dialog__header">
				<h1>{title}</h1>
				<Button className="dialog__header-close-button" onClick={close}>
					<CrossIcon className="dialog__header-close-icon" />
				</Button>
			</header>
			<main class="dialog__main">{children}</main>
		</div>
	);
}
