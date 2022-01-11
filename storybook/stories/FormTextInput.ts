import pkg from "../../lerna.json";

// import type { FormSchemaEntry } from "../../packages/formtextinputrenderer/app/types/webcomponent.type";

export interface FormTextInputProps {
  id: string;
  schemaentry: any;
}

export const createFormTextInput = ({
  id,
  schemaentry,
}: FormTextInputProps) => {
  if (!document.getElementById("hb-input-text-script")) {
    const script = document.createElement("script");
    script.id = "hb-input-text-script";

    script.src = !window.location.href.includes("localhost")
      ? `https://cdn.jsdelivr.net/npm/@htmlbricks/hb-input-text@${pkg.version}/release/release.js`
      : "http://localhost:6006/input-text/dist/release.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("hb-input-text");
    c.id = id;
  }
  if (schemaentry) {
    c.setAttribute("schemaentry", JSON.stringify(schemaentry));
  } else {
    if (c.hasAttribute("schemaentry")) c.removeAttribute("schemaentry");
  }
  return c;
};
