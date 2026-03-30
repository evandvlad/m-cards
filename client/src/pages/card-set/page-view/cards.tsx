import { EmptyState } from "~client/elements/empty-state/index.tsx";
import NotFoundIcon from "~client/icons/not-found.tsx";

import { pageContext } from "../page-context.ts";

import { Card } from "./card.tsx";

export function Cards() {
	const { cardIds, filter } = pageContext.useContext();

	if (filter.hasContent.value && cardIds.value.length === 0) {
		return <EmptyState Icon={NotFoundIcon}>There are no cards for this filter's criteria.</EmptyState>;
	}

	return <div class="page-cards">{cardIds.value.map((id) => <Card key={id} id={id} />)}</div>;
}
