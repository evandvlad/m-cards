import { cardSetsUrl } from "~shared/page-urls.ts";

export type PageNavItemType = "sets";

export type PageNavItem = {
	type: PageNavItemType;
	name: string;
	url: string;
};

export const logoLinkUrl = cardSetsUrl;

export const pageNavItems: PageNavItem[] = [
	{
		type: "sets",
		name: "Sets",
		url: cardSetsUrl,
	},
];
