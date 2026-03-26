import type { ComponentChild } from "preact";
import { useState } from "preact/hooks";

import { classes } from "~client/lib/css-classes/index.ts";

import "./index.css";

type Props = {
	front: ComponentChild;
	back: ComponentChild;
};

export function FlipCard({ front, back }: Props) {
	const [isBackVisible, flip] = useState(false);
	const className = classes("flip-card", { "flip-card--flipped": isBackVisible });

	function handleClick() {
		flip(!isBackVisible);
	}

	return (
		<div class={className} onClick={handleClick}>
			<div class="flip-card__inner">
				<div class="flip-card__front">{front}</div>
				<div class="flip-card__back">{back}</div>
			</div>
		</div>
	);
}
