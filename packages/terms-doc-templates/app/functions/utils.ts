import type { IDoc } from "@app/types/webcomponent.type";

export function sortFinalDoc(doc: IDoc) {
	let ci = 0;
	let pi = 0;
	let li = 0;
	const chapters = doc.chapters.sort((a, b) => a.index - b.index);
	for (const chapter of chapters) {
		chapter.index = ci;
		ci++;
		const sortedParagraphs = chapter.paragraphs.sort((a, b) => a.index - b.index);

		for (const paragraph of sortedParagraphs) {
			paragraph.index = pi;
			pi++;
			const sortedList = paragraph.list.sort((a, b) => a.index - b.index);
			for (const lis of sortedList) {
				lis.index = li;
				li++;
			}
			paragraph.list = sortedList;
		}
		chapter.paragraphs = sortedParagraphs;
	}
	doc.chapters = chapters;
	return doc;
}
