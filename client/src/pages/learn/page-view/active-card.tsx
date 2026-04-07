import { classes } from "~client/lib/css-classes/index.ts";
import { FlipCard } from "~client/elements/flip-card/index.tsx";
import { CardSideContent } from "~client/components/card-side-content/index.tsx";

import { pageContext } from "../page-context.ts";

function getClasses(isReversed: boolean) {
	return classes("page-content-active-card", {
		"page-content-active-card--reversed": isReversed,
	});
}

export function ActiveCard() {
	const { activeCard } = pageContext.useContext();
	const { front, back, isReversed } = activeCard.value;

	return back
		? (
			<FlipCard
				front={<CardSideContent className={getClasses(isReversed)} content={front} />}
				back={<CardSideContent className={getClasses(!isReversed)} content={back} />}
			/>
		)
		: <CardSideContent className={getClasses(isReversed)} content={front} />;
}
