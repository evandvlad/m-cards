import type { ComponentChild } from "preact";
import { useState } from "preact/hooks";

import { classes } from "~client/lib/css-classes/index.ts";

export type TabItem = {
	label: string;
	content: ComponentChild;
};

type Props = {
	items: TabItem[];
};

export function Tabs({ items }: Props) {
	const [activeTabIndex, setActiveTabIndex] = useState(0);
	const { content } = items[activeTabIndex];

	return (
		<div class="card-detail-dialog__tabs">
			<div class="card-detail-dialog__tabs-nav">
				{items.map(({ label }, i) => {
					const className = classes("card-detail-dialog__tabs-nav-item", {
						"card-detail-dialog__tabs-nav-item--active": activeTabIndex === i,
					});

					function handleClick() {
						setActiveTabIndex(i);
					}

					return (
						<div
							key={label}
							class={className}
							onClick={handleClick}
						>
							{label}
						</div>
					);
				})}
			</div>
			<div class="card-detail-dialog__tabs-content">{content}</div>
		</div>
	);
}
