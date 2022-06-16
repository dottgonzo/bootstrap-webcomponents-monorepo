import type { IDoc } from "@app/types/webcomponent.type";

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
