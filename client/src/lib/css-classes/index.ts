export function classes(...args: Array<string | null | undefined | Record<string, boolean>>) {
	return args.reduce<string[]>((acc, arg) => {
		if (!arg) {
			return acc;
		}

		if (typeof arg === "string") {
			acc.push(arg);
			return acc;
		}

		Object.entries(arg).forEach(([val, isSuitable]) => {
			if (isSuitable) {
				acc.push(val);
			}
		});

		return acc;
	}, []).join(" ");
}
