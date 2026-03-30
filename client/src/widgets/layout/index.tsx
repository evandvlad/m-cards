import { type ComponentChild, render } from "preact";

import { assertNonNullable } from "~shared/lib/error/index.ts";

import { Nav } from "./nav.tsx";
import { logoLinkUrl, type NavItemType } from "./values.ts";

import "../global.css";
import "./index.css";

type Params = {
	content: ComponentChild;
	documentTitle?: string;
	navItemType?: NavItemType;
};

export function renderLayout({ content, navItemType, documentTitle }: Params) {
	const rootElement = document.querySelector("[data-page-root]");
	assertNonNullable(rootElement, "The page root element is not found.");

	const appVersion = document.body.getAttribute("data-app-version");
	assertNonNullable(appVersion, "The app's version number is not found.");

	if (documentTitle) {
		document.title = `${document.title} | ${documentTitle}`;
	}

	render(
		<div class="w-layout">
			<header class="w-layout__header">
				<div class="w-layout__header-content">
					<a class="w-layout__logo" href={logoLinkUrl}>M-Cards</a>
					<Nav navItemType={navItemType} />
					<div class="w-layout__app-version">version: {appVersion}</div>
				</div>
			</header>
			<main class="w-layout__main">
				{content}
			</main>
		</div>,
		rootElement,
	);
}
