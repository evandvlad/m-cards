import { renderPage } from "~client/components/page/index.tsx";

import { PageContent } from "./page-content.tsx";

renderPage({
	documentTitle: "Page not found",
	content: <PageContent />,
});
