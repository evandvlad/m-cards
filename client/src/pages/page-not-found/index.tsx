import { renderLayout } from "~client/widgets/layout/index.tsx";

import { PageView } from "./page-view.tsx";

renderLayout({
	documentTitle: "Page not found",
	content: <PageView />,
});
