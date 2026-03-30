import { IconLink } from "~client/elements/icon-link/index.tsx";
import LearnIcon from "~client/icons/learn.tsx";
import { PageTitle } from "~client/components/page-title/index.tsx";

import { pageContext } from "../page-context.ts";

export function Header() {
	const { title, cardsCount, registeredAt, learnUrl, filter } = pageContext.useContext();
	const Filter = filter.View;
	const details = [`Cards: ${cardsCount}`, `Registered at ${registeredAt}`];

	return (
		<div class="page-header">
			<div class="page-header__top">
				<PageTitle title={title} details={details} />
				<IconLink className="page-header__link" href={learnUrl} Icon={LearnIcon} />
			</div>
			<Filter placeholder="Filter cards..." />
		</div>
	);
}
