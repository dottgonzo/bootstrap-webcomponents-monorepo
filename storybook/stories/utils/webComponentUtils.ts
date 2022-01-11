import { version } from "../../../lerna.json";
import { ArgTypes } from "@storybook/html";

export const webComponentBind = (
  args: any,
  argTypes: ArgTypes,
  componentName: string,
  innerHTML?: string
) => {
  if (!args.id) args.id = componentName + "key";
  const attributes = Object.keys(argTypes).filter(
    (f) => argTypes[f].control && !argTypes[f].control.disable
  );
  const actions = Object.keys(argTypes).filter((f) => argTypes[f].action);
  if (!document.getElementById("hb-" + componentName + "-script")) {
    const script = document.createElement("script");
    script.id = "hb-" + componentName + "-script";
    script.src = !window.location.href.includes("localhost")
      ? `https://cdn.jsdelivr.net/npm/@htmlbricks/hb-${componentName}@${version}/release/release.js`
      : `http://localhost:6006/${componentName}/dist/release.js`;
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(args.id)) {
    c = document.getElementById(args.id);
  } else {
    c = document.createElement("hb-" + componentName);
    c.id = args.id;
    if (innerHTML) c.innerHTML = innerHTML;

    for (const action of actions) {
      c.addEventListener(action, (p: any) => args[action](p.detail));
    }
  }
  if (args._testInnerHtml) c.innerHTML = args._testInnerHtml;

  for (const attribute of attributes) {
    if (args[attribute]) {
      let val: string = "";
      if (args[attribute] === true) {
        val = "yes";
      } else if (args[attribute] === false) {
        val = "no";
      } else if (typeof args[attribute] === "string") {
        val = args[attribute];
      } else if (typeof args[attribute] === "object") {
        val = JSON.stringify(args[attribute]);
      } else if (typeof args[attribute] === "number") {
        val = args[attribute].toString();
      }
      c.setAttribute(attribute, val);
    } else {
      if (c.hasAttribute(attribute)) c.removeAttribute(attribute);
    }
  }

  return c;
};
