import { EmptyState } from "~client/elements/empty-state/index.tsx";
import NotFoundIcon from "~client/icons/not-found.tsx";

import { pageContext } from "../page-context.ts";

import { Set } from "./set.tsx";

export function Sets() {
	const { cardSetIds, filter } = pageContext.useContext();

	if (filter.hasContent.value && cardSetIds.value.length === 0) {
		return <EmptyState Icon={NotFoundIcon}>There are no sets for this filter's criteria.</EmptyState>;
	}

	return <div class="page-sets">{cardSetIds.value.map((id) => <Set key={id} id={id} />)}</div>;
}
