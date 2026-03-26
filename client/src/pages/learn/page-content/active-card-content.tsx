import type { ComponentChild } from "preact";

import { FlipCard } from "~client/components/flip-card/index.tsx";

import { pageContext } from "../page-context.ts";

function Content({ content }: { content: ComponentChild }) {
	return <div class="page-content-active-card__content">{content}</div>;
}

export function ActiveCardContent() {
	const { activeCard } = pageContext.useContext();
	const { front, back } = activeCard.value;

	return back
		? <FlipCard front={<Content content={front} />} back={<Content content={back} />} />
		: <Content content={front} />;
}
