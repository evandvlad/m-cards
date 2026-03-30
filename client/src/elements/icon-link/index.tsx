import type { ComponentType } from "preact";

import { classes } from "~client/lib/css-classes/index.ts";

import "./index.css";

type Props = {
	className: string;
	href: string;
	Icon: ComponentType<{ className: string }>;
};

export function IconLink({ className, href, Icon }: Props) {
	const classNames = classes("icon-link", className);

	return (
		<a class={classNames} href={href}>
			<Icon className="icon-link__icon" />
		</a>
	);
}
