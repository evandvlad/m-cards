import { ViewModel } from "./view-model.ts";
import { Component } from "./component.tsx";

type ViewProps = {
	placeholder: string;
};

type Params = {
	onChanged: () => void;
};

export class EntityFilter {
	View;
	hasContent;

	#viewModel;

	constructor({ onChanged }: Params) {
		const viewModel = new ViewModel({ onChanged });
		this.hasContent = viewModel.hasContent;

		this.View = (props: ViewProps) => <Component {...props} viewModel={viewModel} />;
		this.#viewModel = viewModel;
	}

	isMatched(value: string) {
		const filterValue = this.#viewModel.content.value.toLowerCase();
		return value.toLowerCase().includes(filterValue);
	}
}
