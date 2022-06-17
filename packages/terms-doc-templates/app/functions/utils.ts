import type { CookieRow, IDoc, IRow, ITableHeaders } from "@app/types/webcomponent.type";

export function sortFinalDoc(doc: IDoc) {
	let ci = 1;

	const chapters = doc.chapters.filter((f) => f).sort((a, b) => a.index - b.index);
	for (const chapter of chapters) {
		chapter.index = ci;
		ci++;
		let pi = 1;
		const sortedParagraphs = chapter.paragraphs.filter((f) => f).sort((a, b) => a.index - b.index);

		for (const paragraph of sortedParagraphs) {
			paragraph.index = pi;
			pi++;
			let li = 1;

			if (paragraph.list?.length) {
				const sortedList = paragraph.list.filter((f) => f).sort((a, b) => a.index - b.index);
				for (const lis of sortedList) {
					lis.index = li;
					li++;
				}
				paragraph.list = sortedList;
			}
		}
		chapter.paragraphs = sortedParagraphs;
	}
	doc.chapters = chapters;
	return doc;
}
export const cookieHeaders: ITableHeaders = [
	{ key: "name", label: "Nome", nosort: true },
	{ key: "service", label: "Servizio", nosort: true },
	{ key: "porpose", label: "Scope", nosort: true },
	{ key: "details", label: "Tipologie e Durata", nosort: true },
];

export function mapCookie(cookie: CookieRow): IRow {
	const row: IRow = {
		_id: cookie.name,
		name: cookie.name,
		service: cookie.service,
		porpose: cookie.purpose,
		details: (cookie.storage === "persistent" ? "" : "") + cookie.durate,
	};
	return row;
}
