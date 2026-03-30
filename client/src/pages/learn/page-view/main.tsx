import { PageTitle } from "~client/components/page-title/index.tsx";

import { ActiveCard } from "./active-card.tsx";
import { pageContext } from "../page-context.ts";

export function Main() {
	const { title } = pageContext.useContext();

	return (
		<>
			<PageTitle title={title} />
			<ActiveCard />
		</>
	);
}
