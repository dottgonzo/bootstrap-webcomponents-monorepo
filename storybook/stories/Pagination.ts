import pkg from "../../lerna.json";

export interface PaginationProps {
  id: string;
  pages: number;
  size?: number;
  page?: number;
  primarycolor?: string;
  pagechange?: (p) => void;
}

export const createPagination = (args: any) => {
  if (!args.id) args.id = "rgrgrg";
  if (!document.getElementById("paginationbootstrapcomponentjs")) {
    const script = document.createElement("script");
    script.id = "paginationbootstrapcomponentjs";

    script.src = !window.location.href.includes("localhost")
      ? `https://cdn.jsdelivr.net/npm/@htmlbricks/paginationbootstrap-component@${pkg.version}/release/paginationbootstrap.js`
      : "http://localhost:6006/pagination/dist/paginationbootstrap.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(args.id)) {
    c = document.getElementById(args.id);
  } else {
    c = document.createElement("paginationbootstrap-component");
    c.id = args.id;
    c.addEventListener("pagechange", (p: any) => args.pagechange(p.detail));
  }

  if (args.pages) {
    c.setAttribute("pages", args.pages.toString());
  } else {
    if (c.hasAttribute("pages")) c.removeAttribute("pages");
  }
  if (args.size) {
    c.setAttribute("size", args.size.toString());
  } else {
    if (c.hasAttribute("size")) c.removeAttribute("size");
  }
  if (args.page) {
    c.setAttribute("page", args.page.toString());
  } else {
    if (c.hasAttribute("page")) c.removeAttribute("page");
  }
  if (args.primarycolor) {
    c.setAttribute("primarycolor", args.primarycolor);
  } else {
    if (c.hasAttribute("primarycolor")) c.removeAttribute("primarycolor");
  }

  return c;
};
