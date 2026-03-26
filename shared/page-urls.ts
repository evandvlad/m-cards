export const cardSetsUrl = "/";
export const pageNotFoundUrl = "/page-not-found";

export function getCardSetUrl({ id }: { id: string }) {
	const qParams = new URLSearchParams({ id });
	return `/card-set?${qParams}`;
}

export function getLearnUrl({ id }: { id: string }) {
	const qParams = new URLSearchParams({ id });
	return `/learn?${qParams}`;
}
