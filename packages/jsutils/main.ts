export type supportedTheme = "bootstrap";
export type CssValueType = "color" | "string" | "htmlsize" | "number";
export type CssPart = {
  name: string;
  description?: string;
};
export type HtmlSlot = {
  name: string;
  description?: string;
};
export type CssVar = {
  defaultValue?: string;
  valueType: CssValueType;
  name: string;
  description?: string;
  theme?: supportedTheme;
};
export type StyleSetup = {
  parts: CssPart[];
  // themes: supportedTheme[];
  vars: CssVar[];
};
export type i18nLang = {
  language: string;
  lang: string;
};
export interface ComponentShortSetup {
  i18n: i18nLang[];
  name: string;
  category: string;
  tags: string[];
  size: {};
  iifePath: string;
  repoName: string;
  version: string;
  screenshots: string[];
  licenses: [
    {
      type:
        | "Apache-2.0"
        | "MIT"
        | "ISC"
        | "BSD-3-Clause"
        | "BSD-2-Clause"
        | "Unlicense"
        | "Public-Domain"
        | "Other"
        | "AGPLv2"
        | "AGPLv3";
      path: string;
      cost: number;
      currency: "EUR" | "USD";
      conditions?: string;
    }
  ];
  readmePath: string;
}
export interface ComponentSetup extends ComponentShortSetup {
  definitions: {
    events: {
      $ref: string;
      $schema: string;
      definitions: any;
    };
    component: {
      $ref: string;
      $schema: string;
      definitions: any;
    };
  };
  storybookArgs: any;
  styleSetup: StyleSetup;
  htmlSlots: HtmlSlot[];
  examples: any[];
}
export function getChildStyleToPass(
  parsedStyle: { [x: string]: string },
  vars: CssVar[]
) {
  let toreturn = "";
  if (
    parsedStyle &&
    vars?.length &&
    Object.keys(parsedStyle)?.length &&
    vars?.filter((f) => Object.keys(parsedStyle).includes(f.name))?.length
  ) {
    for (const k of Object.keys(parsedStyle)) {
      const isPresent = vars?.filter(
        (f) => f.name === k && f.defaultValue !== parsedStyle[k]
      );
      if (isPresent) {
        toreturn += `${k}:${parsedStyle[k]};`;
      }
    }
  }
  return toreturn;
}

export function addComponent(opts?: {
  local?: string;
  iifePath?: string;
  repoName: string;
  provider?: "github" | "npm";
  version: string;
}) {
  const componentName = opts?.repoName.split("/")?.[1] || opts?.repoName;
  if (!componentName) throw new Error("wrong componentPath " + opts?.repoName);
  if (!opts?.version) throw new Error("wrong version " + opts?.version);
  const iifePath = opts?.iifePath || "release/release.js";
  if (!document.getElementById(componentName + "-script")) {
    const script = document.createElement("script");
    script.id = componentName + "-script";
    script.src = `https://cdn.jsdelivr.net/npm/${opts.repoName}@${opts.version}/${iifePath}`;
    if (opts?.local && location.href.includes("localhost")) {
      script.src = `${opts.local}`;
    }
    document.head.appendChild(script);
  }
}

export class LanguageTranslator {
  dictionary: { [x: string]: { [x: string]: string } };
  lang: string;
  constructor(opts: {
    lang?: string;
    dictionary: { [x: string]: { [x: string]: string } };
  }) {
    if (!opts?.dictionary) throw new Error("no dictionary provided");
    this.dictionary = opts.dictionary;
    this.setLang(opts?.lang);
  }
  setLang(lang?: string) {
    if (!lang) lang = LanguageTranslator.getDefaultLang();
    this.lang = lang;
  }

  translateWord(wordKey: string, lang?: string) {
    return LanguageTranslator.getDictionaryWord(
      wordKey,
      this.dictionary,
      lang || this.lang
    );
  }
  translateDate(
    dateISOString: Date,
    timeOptions: Intl.DateTimeFormatOptions,
    lang?: string
  ) {
    return LanguageTranslator.formatDate(
      dateISOString,
      timeOptions,
      lang || this.lang
    );
  }
  static getDefaultLang() {
    let browserLang = "en";
    if (
      navigator?.languages &&
      navigator.languages[0]?.split("-")[0]?.toLowerCase()?.length
    ) {
      browserLang = navigator.languages[0]?.split("-")[0]?.toLowerCase();
    }
    return browserLang;
  }
  static getDictionaryWord(
    wordKey: string,
    dictionary: { [x: string]: { [x: string]: string } },
    lang?: string
  ) {
    if (!wordKey) throw new Error("no wordKey provided");
    if (!dictionary) throw new Error("no dictionary provided");

    if (lang && dictionary[lang]?.[wordKey]) return dictionary[lang][wordKey];

    let w: string = "";
    const defLng = LanguageTranslator.getDefaultLang();
    if (!lang || defLng !== lang) {
      const defaultLng = dictionary?.[defLng];
      if (defaultLng?.[wordKey]) {
        w = defaultLng[wordKey];
      }
    }

    return w;
  }
  static formatDate(
    dateISOString: Date,
    timeOptions: Intl.DateTimeFormatOptions,
    lang?: string
  ) {
    if (!dateISOString) throw new Error("no date provided");
    if (typeof dateISOString.getMonth !== "function") {
      throw new Error("wrong date format");
    }
    const dayDateFormat = new Intl.DateTimeFormat(
      lang || LanguageTranslator.getDefaultLang(),
      timeOptions
    );
    return dayDateFormat.format(dateISOString);
  }
}
