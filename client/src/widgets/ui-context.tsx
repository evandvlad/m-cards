import { type ComponentChildren, type Context, createContext } from "preact";
import { useContext } from "preact/hooks";

import { assertNonNullable } from "~shared/lib/error/index.ts";

export class UIContext<T> {
	#context: Context<T> | null = null;

	provide(value: T, children: ComponentChildren) {
		this.#context = createContext(value);
		const { Provider } = this.#context;
		return <Provider value={value}>{children}</Provider>;
	}

	useContext = () => {
		assertNonNullable(this.#context, "It appears that you try to use UI Context before it's been provided.");
		return useContext(this.#context);
	};
}
