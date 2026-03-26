import { EmptyState } from "~client/components/empty-state/index.tsx";
import EmptyIcon from "~client/components/icons/empty.tsx";

import { pageContext } from "../page-context.ts";
import { Main } from "./main.tsx";

import "./index.css";

export function PageContent() {
	const { isEmpty } = pageContext.useContext();

	if (isEmpty) {
		return <EmptyState Icon={EmptyIcon}>There are not any cards yet.</EmptyState>;
	}

	return <Main />;
}
