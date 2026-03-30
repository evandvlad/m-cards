type Props = {
	details: string[];
};

export function Details({ details }: Props) {
	return (
		<div class="page-title__details">
			{details.map((detail, i) => <div key={i} class="page-title__detail">{detail}</div>)}
		</div>
	);
}
