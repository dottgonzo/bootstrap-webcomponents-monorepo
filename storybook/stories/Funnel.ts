import pkg from "../../lerna.json";

// import type { FormSchema } from "../../packages/formhostcomponent/app/types/webcomponent.type";

export interface FunnelProps {
  id: string;
  update: (u) => void;
  submit: (u) => void;
  schemes: any[];
  step?: number;
  steps?: number;
  submitstep?: "yes" | "no";
}

export const createFunnel = ({
  id,
  update,
  submit,
  schemes,
  step,
  steps,
  submitstep,
}: FunnelProps) => {
  if (!document.getElementById("funnelcomponentscript")) {
    const script = document.createElement("script");
    script.id = "funnelcomponentscript";
    script.src = !window.location.href.includes("localhost")
      ? `https://cdn.jsdelivr.net/npm/@htmlbricks/hb-funnel@${pkg.version}/release/funnel.js`
      : "http://localhost:6006/funnel/dist/funnel.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("hb-funnel");
    c.id = id;
    c.addEventListener("update", (p: any) => update(p.detail));
    c.addEventListener("submit", (p: any) => submit(p.detail));
  }
  if (schemes) {
    c.setAttribute("schemes", JSON.stringify(schemes));
  } else {
    if (c.hasAttribute("schemes")) c.removeAttribute("schemes");
  }
  if (steps) {
    c.setAttribute("steps", steps.toString());
  } else {
    if (c.hasAttribute("steps")) c.removeAttribute("steps");
  }
  if (step) {
    c.setAttribute("step", step.toString());
  } else {
    if (c.hasAttribute("step")) c.removeAttribute("step");
  }
  if (submitstep) {
    c.setAttribute("submitstep", submitstep);
  } else {
    if (c.hasAttribute("submitstep")) c.removeAttribute("submitstep");
  }
  return c;
};
