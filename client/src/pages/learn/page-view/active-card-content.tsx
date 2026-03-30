import type { ComponentChild } from "preact";

import { classes } from "~client/lib/css-classes/index.ts";
import { FlipCard } from "~client/elements/flip-card/index.tsx";

import { pageContext } from "../page-context.ts";

function Content({ content, isReversed }: { content: ComponentChild; isReversed: boolean }) {
	const classNames = classes("page-active-card__content", {
		"page-active-card__content--reversed": isReversed,
	});

	return <div class={classNames}>{content}</div>;
}

export function ActiveCardContent() {
	const { activeCard } = pageContext.useContext();
	const { front, back, isReversed } = activeCard.value;

	return back
		? (
			<FlipCard
				front={<Content content={front} isReversed={isReversed} />}
				back={<Content content={back} isReversed={!isReversed} />}
			/>
		)
		: <Content content={front} isReversed={isReversed} />;
}
