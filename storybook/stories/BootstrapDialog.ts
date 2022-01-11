import pkg from "../../lerna.json";

export interface BootstrapDialogProps {
  id: string;
  show: boolean;
}

export const createBootstrapDialog = ({ id, show }: BootstrapDialogProps) => {
  if (!document.getElementById("hb-dialog-script")) {
    const script = document.createElement("script");
    script.id = "hb-dialog-script";

    script.src = !window.location.href.includes("localhost")
      ? `https://cdn.jsdelivr.net/npm/@htmlbricks/hb-dialog@${pkg.version}/release/release.js`
      : "http://localhost:6006/dialog/dist/release.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("hb-dialog");
    c.id = id;

    // b.innerHTML = `<button slot="test" onclick="document.getElementsByTagName('hb-dialog')[0].setAttribute('open', 'yes')">test</button>`;
    // document.body.appendChild(b);
  }

  if (show) {
    c.setAttribute("show", "yes");
  } else {
    if (c.hasAttribute("show")) c.removeAttribute("show");
  }
  return c;
};
