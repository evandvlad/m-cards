import { assertNonNullable } from "~shared/lib/error/index.ts";

import { renderLayout } from "~client/widgets/layout/index.tsx";
import { withGuardAsync } from "~client/widgets/ui-guard/index.ts";
import { CardsService } from "~client/web-services/index.ts";
import { createWebIo } from "~client/lib/web-io/index.ts";

import { pageContext } from "./page-context.ts";
import { PageViewModel } from "./page-view-model/index.ts";
import { PageView } from "./page-view/index.tsx";

await withGuardAsync(async () => {
	const id = new URL(location.href).searchParams.get("id");
	assertNonNullable(id, `There is no "id" parameter in the current URL.`);

	const cardsService = new CardsService({ webIo: createWebIo() });
	const pageViewModel = await PageViewModel.create({ id, cardsService });

	renderLayout({
		documentTitle: pageViewModel.title,
		content: pageContext.provide(pageViewModel, <PageView />),
	});
});
