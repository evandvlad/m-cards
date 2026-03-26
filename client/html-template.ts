import type { Conf } from "~shared/conf.ts";

export function renderTemplate(conf: Conf) {
	return `
		<!doctype html>
		<html lang="en">
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>M-Cards</title>
				<link rel="icon" href="/images/favicon.ico" type="image/x-icon">
				<link rel="stylesheet" href="./index.css">
				<script defer src="./index.js" type="module"></script>
			</head>
			<body data-app-version="${conf.appVersion}">
				<div class="page-root" data-page-root></div>
			</body>
		</html>
	`;
}
