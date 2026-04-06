import type { CardSide } from "~shared/data-values/app.ts";

import { classes } from "~client/lib/css-classes/index.ts";
import { FlipCard } from "~client/elements/flip-card/index.tsx";
import { CardSideContent } from "~client/components/card-side-content/index.tsx";

import { pageContext } from "../page-context.ts";

function Content({ content, isReversed }: { content: CardSide; isReversed: boolean }) {
	const classNames = classes("page-active-card__content", {
		"page-active-card__content--reversed": isReversed,
	});

	return <CardSideContent className={classNames} content={content} />;
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
