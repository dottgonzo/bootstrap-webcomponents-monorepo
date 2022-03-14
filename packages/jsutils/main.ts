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
