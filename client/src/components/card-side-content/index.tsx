import type { CardSide as CardSideData } from "~shared/data-values/app.ts";

type Props = {
	className: string;
	content: CardSideData;
};

export function CardSideContent({ className, content }: Props) {
	if (content.isHtml) {
		return <div class={className} dangerouslySetInnerHTML={{ __html: content.value }} />;
	}

	return <div class={className}>{content.value}</div>;
}
