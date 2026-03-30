import { FlipCard } from "~client/elements/flip-card/index.tsx";
import { IconLink } from "~client/elements/icon-link/index.tsx";
import ViewIcon from "~client/icons/view-doc.tsx";
import LearnIcon from "~client/icons/learn.tsx";

import { pageContext } from "../page-context.ts";

type Props = {
	id: string;
};

export function Set({ id }: Props) {
	const context = pageContext.useContext();
	const { name, cardsNumber, registeredAt, cardSetUrl, learnUrl } = context.getCardSet(id);

	return (
		<div class="page-set">
			<FlipCard
				front={<h3 class="page-set__front">{name}</h3>}
				back={
					<div class="page-set__back">
						<div class="page-set__back-links">
							<IconLink className="page-set__back-link" href={cardSetUrl} Icon={ViewIcon} />
							<IconLink className="page-set__back-link" href={learnUrl} Icon={LearnIcon} />
						</div>
						<div class="page-set__back-info">
							<div>Cards: {cardsNumber}</div>
							<div>Registered at {registeredAt}</div>
						</div>
					</div>
				}
			/>
		</div>
	);
}
