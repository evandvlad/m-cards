export function getDatetime() {
	return new Date().toISOString();
}

export function formatToDisplay(datetime: string) {
	return new Intl.DateTimeFormat("ru-Ru", {
		dateStyle: "short",
		timeStyle: "short",
	}).format(new Date(datetime));
}
