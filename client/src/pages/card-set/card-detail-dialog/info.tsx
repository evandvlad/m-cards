import type { CardInfoViewModel } from "./card-info-view-model.ts";

type Props = {
	cardInfo: CardInfoViewModel;
};

export function Info({ cardInfo }: Props) {
	return <div>Registered at {cardInfo.registeredAt}</div>;
}
