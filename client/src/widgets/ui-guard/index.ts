import { generalErrorMessage, isAppError } from "~shared/lib/error/index.ts";

import { ErrorScreen } from "./error-screen.tsx";
import { Loader } from "./loader.tsx";

import "./index.css";

const errorScreen = new ErrorScreen();
const loader = new Loader();

function catchError(e: unknown) {
	const message = isAppError(e) ? e.message : generalErrorMessage;
	errorScreen.show(message);
	throw e;
}

type AsyncOptions = {
	useLoader?: boolean;
};

export function withGuardSync<T>(operation: () => T) {
	try {
		return operation();
	} catch (e) {
		catchError(e);
	}
}

export async function withGuardAsync<T>(operation: () => Promise<T>, options: AsyncOptions = {}) {
	const { useLoader = true } = options;

	try {
		return await (useLoader ? loader.withLoader(operation) : operation());
	} catch (e) {
		catchError(e);
	}
}
