import { classes } from "~client/lib/css-classes/index.ts";

import { navItems, type NavItemType } from "./values.ts";

type Props = {
	navItemType?: NavItemType;
};

export function Nav({ navItemType }: Props) {
	return (
		<nav class="w-layout__nav">
			{navItems.map(({ name, type, url }) => (
				<a
					key={name}
					class={classes("w-layout__nav-link", { "w-layout__nav-link--active": navItemType === type })}
					href={url}
				>
					{name}
				</a>
			))}
		</nav>
	);
}
