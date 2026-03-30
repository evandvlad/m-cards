import { computed, signal } from "@preact/signals";

type Params = {
	onChanged: () => void;
};

export class ViewModel {
	content;

	#onChanged;

	constructor({ onChanged }: Params) {
		this.#onChanged = onChanged;
		this.content = signal("");
	}

	hasContent = computed(() => {
		return this.content.value.length > 0;
	});

	setContent = (value: string) => {
		this.content.value = value;
		this.#onChanged();
	};
}
