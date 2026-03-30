import { Button } from "~client/elements/button/index.tsx";
import RightIcon from "~client/icons/right.tsx";

import { pageContext } from "../page-context.ts";
import { ActiveCardContent } from "./active-card-content.tsx";

export function ActiveCard() {
	const { showNextCard } = pageContext.useContext();

	return (
		<div class="page-active-card">
			<ActiveCardContent />
			<Button className="page-active-card__show-next" onClick={showNextCard}>
				<RightIcon className="page-active-card__show-next-icon" />
			</Button>
		</div>
	);
}
