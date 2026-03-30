import { pageContext } from "../page-context.ts";

type Props = {
	id: string;
};

export function Card({ id }: Props) {
	const context = pageContext.useContext();
	const { name, viewCardDetail } = context.getCard(id);

	return <div class="page-cards__card" onClick={viewCardDetail}>{name}</div>;
}
