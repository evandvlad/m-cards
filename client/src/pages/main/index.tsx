import { renderPage } from "~client/components/page/index.tsx";
import { withGuardAsync } from "~client/components/ui-guard/index.ts";
import { CardsService } from "~client/web-services/index.ts";
import { createWebIo } from "~client/lib/web-io/index.ts";

import { PageViewModel } from "./page-view-model/index.ts";
import { pageContext } from "./page-context.ts";
import { PageContent } from "./page-content/index.tsx";

await withGuardAsync(async () => {
	const cardsService = new CardsService({ webIo: createWebIo() });
	const pageViewModel = await PageViewModel.create({ cardsService });

	renderPage({
		navItemType: "sets",
		content: pageContext.provide(pageViewModel, <PageContent />),
	});
});
