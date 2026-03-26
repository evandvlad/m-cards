import { classes } from "~client/lib/css-classes/index.ts";

import { pageNavItems, type PageNavItemType } from "./values.ts";

type Props = {
	navItemType?: PageNavItemType;
};

export function PageNav({ navItemType }: Props) {
	return (
		<nav class="page__nav">
			{pageNavItems.map(({ name, type, url }) => (
				<a
					key={name}
					class={classes("page__nav-link", { "page__nav-link--active": navItemType === type })}
					href={url}
				>
					{name}
				</a>
			))}
		</nav>
	);
}
