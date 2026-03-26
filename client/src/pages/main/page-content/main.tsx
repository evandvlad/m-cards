import { pageContext } from "../page-context.ts";

import { PageContentSet } from "./page-content-set.tsx";

export function Main() {
	const { cardSetIds } = pageContext.useContext();

	return (
		<div class="page-content-main">
			{cardSetIds.map((id) => <PageContentSet key={id} id={id} />)}
		</div>
	);
}
