import { renderLayout } from "~client/widgets/layout/index.tsx";
import { withGuardAsync } from "~client/widgets/ui-guard/index.ts";
import { CardsService } from "~client/web-services/index.ts";
import { createWebIo } from "~client/lib/web-io/index.ts";

import { PageViewModel } from "./page-view-model/index.ts";
import { pageContext } from "./page-context.ts";
import { PageView } from "./page-view/index.tsx";

await withGuardAsync(async () => {
	const cardsService = new CardsService({ webIo: createWebIo() });
	const pageViewModel = await PageViewModel.create({ cardsService });

	renderLayout({
		navItemType: "sets",
		content: pageContext.provide(pageViewModel, <PageView />),
	});
});
