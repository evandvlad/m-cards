import { pageContext } from "../page-context.ts";

import { PageContentCard } from "./page-content-card.tsx";

export function PageContentCards() {
	const { cardIds } = pageContext.useContext();

	return <div class="page-content-cards">{cardIds.map((id) => <PageContentCard key={id} id={id} />)}</div>;
}
