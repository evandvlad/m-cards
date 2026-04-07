import { Button } from "~client/elements/button/index.tsx";
import RightIcon from "~client/icons/right.tsx";

import { pageContext } from "../page-context.ts";
import { ActiveCard } from "./active-card.tsx";

export function Content() {
	const { showNextCard } = pageContext.useContext();

	return (
		<div class="page-content">
			<ActiveCard />
			<Button onClick={showNextCard}>
				<RightIcon className="page-content__show-next-icon" />
			</Button>
		</div>
	);
}
