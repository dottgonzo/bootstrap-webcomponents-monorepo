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
  if (!document.getElementById("hb-form-script")) {
    const script = document.createElement("script");
    script.id = "hb-form-script";

    script.src = !window.location.href.includes("localhost")
      ? `https://cdn.jsdelivr.net/npm/@htmlbricks/hb-form@${pkg.version}/release/release.js`
      : "http://localhost:6006/form/dist/release.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("hb-form");
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
