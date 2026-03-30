import { UIContext } from "~client/widgets/ui-context.tsx";

import type { PageViewModel } from "./page-view-model/index.ts";

export const pageContext = new UIContext<PageViewModel>();
