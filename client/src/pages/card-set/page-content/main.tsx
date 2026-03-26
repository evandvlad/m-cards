import { PageTitle } from "~client/components/page-title/index.tsx";

import { pageContext } from "../page-context.ts";
import { PageContentCards } from "./page-content-cards.tsx";

export function Main() {
	const { title, cardsCount, registeredAt } = pageContext.useContext();

	return (
		<>
			<PageTitle title={title} details={[`Cards: ${cardsCount}`, `Registered at ${registeredAt}`]} />
			<PageContentCards />
		</>
	);
}
