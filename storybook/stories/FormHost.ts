import type { FormSchema } from "../../packages/formhostcomponent/app/types/webcomponent.type";

export interface FormHostProps {
  id: string;
  schema: FormSchema;
  submit?: (p) => void;
  submitted: boolean;
}

export const createFormHost = ({
  id,
  schema,
  submit,
  submitted,
}: FormHostProps) => {
  if (!document.getElementById("formrendererhostscript")) {
    const script = document.createElement("script");
    script.id = "formrendererhostscript";
    script.src =
      "http://localhost:6006/formhostcomponent/dist/formhostcomponent.js";
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
