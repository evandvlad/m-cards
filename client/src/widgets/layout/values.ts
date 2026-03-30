import { cardSetsUrl } from "~shared/page-urls.ts";

export type NavItemType = "sets";

export type NavItem = {
	type: NavItemType;
	name: string;
	url: string;
};

export const logoLinkUrl = cardSetsUrl;

export const navItems: NavItem[] = [
	{
		type: "sets",
		name: "Sets",
		url: cardSetsUrl,
	},
];
