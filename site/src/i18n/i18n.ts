import dictionary from './i18n.json';

import { LanguageTranslator } from '@htmlbricks/hb-jsutils';

let translator: LanguageTranslator;

export function translateWord(word: string, lang?: string) {
	if (!translator) translator = new LanguageTranslator({ dictionary });
	translator.translateWord(word, lang);
}

export function translateDate(isoDate: Date, format: Intl.DateTimeFormatOptions, lang?: string) {
	if (!translator) translator = new LanguageTranslator({ dictionary });
	translator.translateDate(isoDate, format, lang);
}
