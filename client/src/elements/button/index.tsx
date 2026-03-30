import type { ComponentChildren } from "preact";

import { classes } from "~client/lib/css-classes/index.ts";

import "./index.css";

type Props = {
	className?: string;
	children: ComponentChildren;
	onClick: () => void;
};

export function Button({ onClick, children, className = "" }: Props) {
	const classNames = classes("button", className);
	return <button class={classNames} type="button" onClick={onClick}>{children}</button>;
}
