import pkg from "../../lerna.json";

// import type { FormSchemaEntry } from "../../packages/formfileinputrenderer/app/types/webcomponent.type";

export interface FormFileInputProps {
  id: string;
  schemaentry: any;
}

export const createFormFileInput = ({
  id,
  schemaentry,
}: FormFileInputProps) => {
  if (!document.getElementById("hb-input-file-script")) {
    const script = document.createElement("script");
    script.id = "hb-input-file-script";

    script.src = !window.location.href.includes("localhost")
      ? `https://cdn.jsdelivr.net/npm/@htmlbricks/hb-input-file@${pkg.version}/release/release.js`
      : "http://localhost:6006/input-file/dist/release.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("hb-input-file");
    c.id = id;
  }
  if (schemaentry) {
    c.setAttribute("schemaentry", JSON.stringify(schemaentry));
  } else {
    if (c.hasAttribute("schemaentry")) c.removeAttribute("schemaentry");
  }
  return c;
};
