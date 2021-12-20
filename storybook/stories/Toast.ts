export interface ToastProps {
  id: string;
  show: boolean;
}

export const createToast = ({ id, show }: ToastProps) => {
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
  return c;
};
