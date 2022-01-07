import pkg from "../../lerna.json";

export interface CookielawProps {
  id: string;
  allowdecline: boolean;
  acceptCookieLaw?: (el) => void;
}

export const createCookielaw = ({
  id,
  allowdecline,
  acceptCookieLaw,
}: CookielawProps) => {
  if (!document.getElementById("cookielawcomponentscript")) {
    const script = document.createElement("script");
    script.id = "cookielawcomponentscript";
    script.src = process.env.PRODUCTION
      ? `https://cdn.jsdelivr.net/npm/@htmlbricks/cookielaw-component@${pkg.version}/release/cookielaw.js`
      : "http://localhost:6006/cookielaw/dist/cookielaw.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("cookielaw-component");
    c.id = id;

    c.addEventListener("acceptCookieLaw", (e: any) =>
      acceptCookieLaw(e.detail)
    );
  }

  if (allowdecline || allowdecline === false) {
    c.setAttribute("allowdecline", allowdecline ? "yes" : "no");
  } else {
    if (c.hasAttribute("allowdecline")) c.removeAttribute("allowdecline");
  }

  return c;
};
