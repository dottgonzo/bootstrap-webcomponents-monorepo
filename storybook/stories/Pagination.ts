import pkg from "../../lerna.json";
import { ArgTypes } from "@storybook/html";

export const createPagination = (
  args: any,
  argTypes: ArgTypes,
  componentName: string,
  componentJsName?: string
) => {
  if (!componentJsName) componentJsName = componentName + "js";
  if (!args.id) args.id = componentName + "key";
  const attributes = Object.keys(argTypes).filter(
    (f) => argTypes[f].control && !argTypes[f].control.disable
  );
  const actions = Object.keys(argTypes).filter((f) => argTypes[f].action);
  if (!document.getElementById("hb-paginate-script")) {
    const script = document.createElement("script");
    script.id = "hb-paginate-script";
    script.src = !window.location.href.includes("localhost")
      ? `https://cdn.jsdelivr.net/npm/@htmlbricks/hb-paginate@${pkg.version}/release/release.js`
      : "http://localhost:6006/paginate/dist/release.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(args.id)) {
    c = document.getElementById(args.id);
  } else {
    c = document.createElement("hb-paginate");
    c.id = args.id;
    c.addEventListener("pagechange", (p: any) => args.pagechange(p.detail));
  }

  if (args.pages) {
    c.setAttribute("pages", args.pages.toString());
  } else {
    if (c.hasAttribute("pages")) c.removeAttribute("pages");
  }
  if (args.size) {
    c.setAttribute("size", args.size.toString());
  } else {
    if (c.hasAttribute("size")) c.removeAttribute("size");
  }
  if (args.page) {
    c.setAttribute("page", args.page.toString());
  } else {
    if (c.hasAttribute("page")) c.removeAttribute("page");
  }
  if (args.primarycolor) {
    c.setAttribute("primarycolor", args.primarycolor);
  } else {
    if (c.hasAttribute("primarycolor")) c.removeAttribute("primarycolor");
  }

  return c;
};
