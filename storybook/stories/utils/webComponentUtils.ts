import { version } from "../../../lerna.json";
import { ArgTypes } from "@storybook/html";

function capitalize(string) {
  // take first character, uppercase it
  // add the rest of the string
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function toPascalCase(str) {
  // splitting words by dash
  const words = str.split("-");
  // use capitalize function to capitalize every word
  const capitalized = words.map((word) => capitalize(word));
  // glue up words with .join()
  return capitalized.join("");
}

export const webComponentBind = (
  args: any,
  argTypes: ArgTypes,
  componentName: string,
  options?: { innerHTML?: string; style?: any }
) => {
  if (!args.id) args.id = componentName.replace("hb-", "") + "key";
  const attributes = Object.keys(argTypes).filter(
    (f) => argTypes[f].control && !argTypes[f].control.disable
  );
  const actions = Object.keys(argTypes).filter((f) => argTypes[f].action);
  if (!document.getElementById(componentName + "-script")) {
    const script = document.createElement("script");
    script.id = componentName + "-script";
    script.src = !window.location.href.includes("localhost")
      ? `https://cdn.jsdelivr.net/npm/@htmlbricks/hb-${componentName}@${version}/release/release.js`
      : `http://localhost:6006/${componentName.replace(
          "hb-",
          ""
        )}/dist/release.js`;
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(args.id)) {
    c = document.getElementById(args.id);
  } else {
    c = document.createElement(componentName);
    c.id = args.id;
    if (options?.innerHTML) c.innerHTML = options.innerHTML;

    for (const action of actions) {
      c.addEventListener(action, (p: any) => args[action](p.detail));
    }
  }
  if (options?.style) {
    for (const s of Object.keys(options.style)) {
      if (c?.style?.[s]) c.style[s] = options.style[s];
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
      } else {
        console.error("unkown attr", attribute);
      }
      c.setAttribute(attribute, val);
    } else {
      if (c.hasAttribute(attribute)) c.removeAttribute(attribute);
    }
  }

  return c;
};
export const argTypesExtraUtils = {
  id: { control: { disable: true } },
};
