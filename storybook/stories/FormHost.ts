import pkg from "../../lerna.json";

// import type { FormSchema } from "../../packages/formhostcomponent/app/types/webcomponent.type";

export interface FormHostProps {
  id: string;
  schema: any;
  submit?: (p) => void;
  submitted: boolean;
}

export const createFormHost = ({
  id,
  schema,
  submit,
  submitted,
}: FormHostProps) => {
  if (!document.getElementById("formhostscript")) {
    const script = document.createElement("script");
    script.id = "formhostscript";

    script.src = process.env.PRODUCTION
      ? `https://cdn.jsdelivr.net/npm/@htmlbricks/formrenderer-host@${pkg.version}/release/formhostcomponent.js`
      : "http://localhost:6006/formhostcomponent/dist/formhostcomponent.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("formrenderer-host");
    c.id = id;
    c.addEventListener("submit", (p: any) => submit(p.detail));
  }

  if (schema) {
    c.setAttribute("schema", JSON.stringify(schema));
  } else {
    if (c.hasAttribute("schema")) c.removeAttribute("schema");
  }
  if (submitted) {
    c.setAttribute("submitted", "yes");
  } else {
    if (c.hasAttribute("submitted")) c.removeAttribute("submitted");
  }
  return c;
};
