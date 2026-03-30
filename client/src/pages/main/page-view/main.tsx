import { pageContext } from "../page-context.ts";

import { Sets } from "./sets.tsx";

export function Main() {
	const { filter } = pageContext.useContext();
	const Filter = filter.View;

	return (
		<>
			<div class="page-filter">
				<Filter placeholder="Filter sets..." />
			</div>
			<Sets />
		</>
	);
}
