type Props = {
	content: string;
};

export function CardSide({ content }: Props) {
	return <div class="card-detail-dialog__card-side-content">{content}</div>;
}
