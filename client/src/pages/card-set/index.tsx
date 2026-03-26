import { assertNonNullable } from "~shared/lib/error/index.ts";

import { renderPage } from "~client/components/page/index.tsx";
import { withGuardAsync } from "~client/components/ui-guard/index.ts";
import { CardsService } from "~client/web-services/index.ts";
import { createWebIo } from "~client/lib/web-io/index.ts";

import { pageContext } from "./page-context.ts";
import { PageViewModel } from "./page-view-model/index.ts";
import { PageContent } from "./page-content/index.tsx";

await withGuardAsync(async () => {
	const id = new URL(location.href).searchParams.get("id");
	assertNonNullable(id, `There is no "id" parameter in the current URL.`);

	const cardsService = new CardsService({ webIo: createWebIo() });
	const pageViewModel = await PageViewModel.create({ id, cardsService });

	renderPage({
		documentTitle: pageViewModel.title,
		content: pageContext.provide(pageViewModel, <PageContent />),
	});
});
