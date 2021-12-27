import type { FormSchema } from "../../packages/formhostcomponent/app/types/webcomponent.type";

export interface FunnelProps {
  id: string;
  update: (u) => void;
  schemes: FormSchema[];
  step?: number;
  steps?: number;
}

export const createFunnel = ({
  id,
  update,
  schemes,
  step,
  steps,
}: FunnelProps) => {
  if (!document.getElementById("funnelcomponentscript")) {
    const script = document.createElement("script");
    script.id = "funnelcomponentscript";
    script.src = "http://localhost:6006/funnel/dist/funnel.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("funnel-component");
    c.id = id;
    c.addEventListener("update", (p: any) => update(p.detail));
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
  return c;
};
