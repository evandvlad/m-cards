import "./index.css";

function Details({ details }: { details: string[] }) {
	return (
		<div class="page-title__details">
			{details.map((detail, i) => <div key={i} class="page-title__detail">{detail}</div>)}
		</div>
	);
}

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
