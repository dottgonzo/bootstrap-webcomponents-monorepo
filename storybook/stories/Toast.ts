export interface Header {
  img?: HTMLImageElement | SVGElement | null;
  strong?: string | null;
  small?: string | null;
}
export interface ToastProps {
  id: string;
  show: boolean;
  header: Header;
  body: string;
}


export const createToast = ({ id, show, header, body }: ToastProps) => {
  if (!document.getElementById("toastcomponentscript")) {
    const script = document.createElement("script");
    script.id = "toastcomponentscript";
    script.src =
      "http://localhost:6006/toast/dist/toastcomponent.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("toast-component");
    c.id = id;
  }

  if (show) {
    c.setAttribute("show", "yes");
  } else {
    if (c.hasAttribute("show")) c.removeAttribute("show");
  }
  
  if (header) {
    c.setAttribute("header", JSON.stringify(header));
  } else {
    if (c.hasAttribute("header")) c.removeAttribute("header");
  }

  if (body) {
    c.setAttribute("body", "Hello, world! This is a toast message.2");
  } else {
    if (c.hasAttribute("body")) c.removeAttribute("body");
  }
  return c;
};
