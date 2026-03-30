import type { InputEventHandler } from "preact";

import { classes } from "~client/lib/css-classes/index.ts";

import "./index.css";

type Props = {
	value: string;
	onChange: (value: string) => void;
	className?: string;
	placeholder?: string;
	type?: "text" | "search";
};

export function TextField({ value, onChange, type = "text", placeholder = "", className = "" }: Props) {
	const classNames = classes("text-field", className);

	const handleChange: InputEventHandler<HTMLInputElement> = (e) => {
		onChange(e.currentTarget.value);
	};

	return (
		<input
			type={type}
			class={classNames}
			value={value}
			onInput={handleChange}
			placeholder={placeholder}
		/>
	);
}
