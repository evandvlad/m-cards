import { Details } from "./details.tsx";

import "./index.css";

type Props = {
	title: string;
	details?: string[];
};

export function PageTitle({ title, details = [] }: Props) {
	return (
		<header class="page-title">
			<h1 class="page-title__value">{title}</h1>
			{details.length > 0 && <Details details={details} />}
		</header>
	);
}
