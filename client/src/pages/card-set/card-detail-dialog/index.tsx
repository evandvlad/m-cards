import type { Card } from "~shared/data-values/app.ts";

import { Dialog } from "~client/components/dialog/index.tsx";

import { CardInfoViewModel } from "./card-info-view-model.ts";
import { type TabItem, Tabs } from "./tabs.tsx";
import { CardSide } from "./card-side.tsx";
import { Info } from "./info.tsx";

import "./index.css";

function createTabItems(card: Card) {
	const { front, back } = card;

	const tabItems: TabItem[] = [
		{ label: "Front", content: <CardSide content={front} /> },
	];

	if (back) {
		tabItems.push({ label: "Back", content: <CardSide content={back} /> });
	}

	tabItems.push({ label: "Info", content: <Info cardInfo={new CardInfoViewModel(card)} /> });

	return tabItems;
}

type Params = {
	card: Card;
};

export function showCardDetailDialog({ card }: Params) {
	const tabItems = createTabItems(card);

	Dialog.open({
		title: card.name,
		className: "card-detail-dialog",
		Content: () => <Tabs items={tabItems} />,
	});
}
