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
  if (!document.getElementById("formrendererfileinputscript")) {
    const script = document.createElement("script");
    script.id = "formrendererfileinputscript";

    script.src = process.env.PRODUCTION
      ? `https://cdn.jsdelivr.net/npm/@htmlbricks/formrenderer-fileinput@${pkg.version}/release/formrendererfileinput.js`
      : "http://localhost:6006/formfileinputrenderer/dist/formrendererfileinput.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("formrenderer-fileinput");
    c.id = id;
  }
  if (schemaentry) {
    c.setAttribute("schemaentry", JSON.stringify(schemaentry));
  } else {
    if (c.hasAttribute("schemaentry")) c.removeAttribute("schemaentry");
  }
  return c;
};
