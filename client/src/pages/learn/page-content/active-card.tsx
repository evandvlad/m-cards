import { Button } from "~client/components/button/index.tsx";
import RightIcon from "~client/components/icons/right.tsx";

import { pageContext } from "../page-context.ts";
import { ActiveCardContent } from "./active-card-content.tsx";

export function ActiveCard() {
	const { showNextCard } = pageContext.useContext();

	return (
		<div class="page-content-active-card">
			<ActiveCardContent />
			<Button className="page-content-active-card__show-next" onClick={showNextCard}>
				<RightIcon className="page-content-active-card__show-next-icon" />
			</Button>
		</div>
	);
}
