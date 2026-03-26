import { FlipCard } from "~client/components/flip-card/index.tsx";
import ViewIcon from "~client/components/icons/view-doc.tsx";
import LearnIcon from "~client/components/icons/learn.tsx";

import { pageContext } from "../page-context.ts";

type Props = {
	id: string;
};

export function PageContentSet({ id }: Props) {
	const context = pageContext.useContext();
	const { name, cardsNumber, registeredAt, cardSetUrl, learnUrl } = context.getCardSet(id);

	return (
		<div class="page-content-set">
			<FlipCard
				front={<h3 class="page-content-set__front">{name}</h3>}
				back={
					<div class="page-content-set__back">
						<div class="page-content-set__back-links">
							<a href={cardSetUrl}>
								<ViewIcon className="page-content-set__back-links-icon" />
							</a>
							<a href={learnUrl}>
								<LearnIcon className="page-content-set__back-links-icon" />
							</a>
						</div>
						<div class="page-content-set__back-info">
							<div>Cards: {cardsNumber}</div>
							<div>Registered at {registeredAt}</div>
						</div>
					</div>
				}
			/>
		</div>
	);
}
