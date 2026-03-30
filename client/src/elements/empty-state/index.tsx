import type { ComponentChildren, ComponentType } from "preact";

import "./index.css";

type Props = {
	Icon: ComponentType<{ className: string }>;
	children: ComponentChildren;
};

export function EmptyState({ Icon, children }: Props) {
	return (
		<div class="empty-state">
			<div className="empty-state__icon-wrapper">
				<Icon className="empty-state__icon" />
			</div>
			{children}
		</div>
	);
}
