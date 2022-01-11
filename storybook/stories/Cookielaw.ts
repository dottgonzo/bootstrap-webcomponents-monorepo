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
  if (!document.getElementById("hb-cookie-law-banner-script")) {
    const script = document.createElement("script");
    script.id = "hb-cookie-law-banner-script";
    script.src = !window.location.href.includes("localhost")
      ? `https://cdn.jsdelivr.net/npm/@htmlbricks/hb-cookie-law-banner@${pkg.version}/release/release.js`
      : "http://localhost:6006/cookie-law-banner/dist/release.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("hb-cookie-law-banner");
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
