import { PageTitle } from "~client/components/page-title/index.tsx";

import { Content } from "./content.tsx";
import { pageContext } from "../page-context.ts";

export function Main() {
	const { title } = pageContext.useContext();

	return (
		<>
			<PageTitle title={title} />
			<Content />
		</>
	);
}
