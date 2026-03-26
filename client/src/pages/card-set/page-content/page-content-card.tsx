import { pageContext } from "../page-context.ts";

type Props = {
	id: string;
};

export function PageContentCard({ id }: Props) {
	const context = pageContext.useContext();
	const { name, viewCardDetail } = context.getCard(id);

	return <div class="page-content-cards__card" onClick={viewCardDetail}>{name}</div>;
}
