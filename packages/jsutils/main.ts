export type CssPart = {
  name: string;
  description?: string;
};
export type HtmlSlot = {
  name: string;
  description?: string;
};
export type CssVar = {
  defaultValue: string;
  name: string;
  theme?: string;
};
export type i18nLang = {
  language: string;
  lang: string;
};
export function addComponent(
  componentName: string,
  version: string,
  allowLocal?: boolean
) {
  if (!document.getElementById("hb-" + componentName + "-script")) {
    const script = document.createElement("script");
    script.id = "hb-" + componentName + "-script";
    script.src = `https://cdn.jsdelivr.net/npm/@htmlbricks/hb-${componentName}@${version}/release/release.js`;
    if (allowLocal && location.href.includes("localhost")) {
      script.src = `http://localhost:6006/${componentName}/dist/release.js`;
    }

    document.head.appendChild(script);
  }
}

export function getDefaultLang() {
  let browserLang = "en";
  if (
    navigator?.languages &&
    navigator.languages[0]?.split("-")[0]?.toLowerCase()?.length
  ) {
    browserLang = navigator.languages[0]?.split("-")[0]?.toLowerCase();
  }
  return browserLang;
}

export function getDictionaryWord(
  wordKey: string,
  dictionary: { [x: string]: { [x: string]: string } },
  lang?: string
) {
  if (!wordKey) throw new Error("no wordKey provided");
  if (!dictionary) throw new Error("no dictionary provided");

  if (lang && dictionary[lang]?.[wordKey]) return dictionary[lang][wordKey];

  let w: string = "";
  const defLng = getDefaultLang();
  if (!lang || defLng !== lang) {
    const defaultLng = dictionary?.[defLng];
    if (defaultLng?.[wordKey]) {
      w = defaultLng[wordKey];
    }
  }

  return w;
}

export class languageWords {
  dictionary: { [x: string]: { [x: string]: string } };
  lang: string;
  constructor(opts: {
    lang?: string;
    dictionary: { [x: string]: { [x: string]: string } };
  }) {
    this.dictionary = opts.dictionary;
    this.lang = opts.lang ? opts.lang : getDefaultLang();
  }
  setLang(lang: string) {
    if (!lang) throw new Error("no lang provided");
    this.lang = lang;
  }
  translate(wordKey: string) {
    return getDictionaryWord(wordKey, this.dictionary, this.lang);
  }
}
