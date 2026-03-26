import { EmptyState } from "~client/components/empty-state/index.tsx";
import Icon from "~client/components/icons/page-not-found.tsx";

export function PageContent() {
	return <EmptyState Icon={Icon}>Page is not found.</EmptyState>;
}
