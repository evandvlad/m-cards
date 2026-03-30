import { TextField } from "~client/elements/text-field/index.tsx";

import type { ViewModel } from "./view-model.ts";

type Props = {
	viewModel: ViewModel;
	placeholder: string;
};

export function Component({ viewModel, placeholder }: Props) {
	return (
		<TextField
			type="search"
			value={viewModel.content.value}
			onChange={viewModel.setContent}
			placeholder={placeholder}
		/>
	);
}
