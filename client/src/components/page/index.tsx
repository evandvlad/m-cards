import { type ComponentChild, render } from "preact";

import { assertNonNullable } from "~shared/lib/error/index.ts";

import { PageNav } from "./page-nav.tsx";
import { logoLinkUrl, type PageNavItemType } from "./values.ts";

import "../global.css";
import "./index.css";

type Params = {
	content: ComponentChild;
	documentTitle?: string;
	navItemType?: PageNavItemType;
};

export function renderPage({ content, navItemType, documentTitle }: Params) {
	const rootElement = document.querySelector("[data-page-root]");
	assertNonNullable(rootElement, "The page root element is not found.");

	const appVersion = document.body.getAttribute("data-app-version");
	assertNonNullable(appVersion, "The app's version number is not found.");

	if (documentTitle) {
		document.title = `${document.title} | ${documentTitle}`;
	}

	render(
		<div class="page">
			<header class="page__header">
				<div class="page__header-content">
					<a class="page__logo" href={logoLinkUrl}>M-Cards</a>
					<PageNav navItemType={navItemType} />
					<div class="page__app-version">version: {appVersion}</div>
				</div>
			</header>
			<main class="page__main">
				{content}
			</main>
		</div>,
		rootElement,
	);
}
