import { EmptyState } from "~client/elements/empty-state/index.tsx";
import PageNotFoundIcon from "~client/icons/page-not-found.tsx";

export function PageView() {
	return <EmptyState Icon={PageNotFoundIcon}>Page is not found.</EmptyState>;
}
