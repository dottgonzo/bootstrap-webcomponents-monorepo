import pkg from "../../lerna.json";

export interface PaginationProps {
  id: string;
  pages: number;
  size?: number;
  page?: number;
  primarycolor?: string;
  pagechange?: (p) => void;
}

export const createPagination = ({
  pages,
  size,
  page,
  primarycolor,
  id,
  pagechange,
}: PaginationProps) => {
  if (!document.getElementById("hb-paginate-script")) {
    const script = document.createElement("script");
    script.id = "hb-paginate-script";

    script.src = !window.location.href.includes("localhost")
      ? `https://cdn.jsdelivr.net/npm/@htmlbricks/hb-paginate@${pkg.version}/release/release.js`
      : "http://localhost:6006/paginate/dist/release.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("hb-paginate");
    c.id = id;
    c.addEventListener("pagechange", (p: any) => pagechange(p.detail));
  }

  c.setAttribute("pages", pages.toString());

  if (size) {
    c.setAttribute("size", size.toString());
  } else {
    if (c.hasAttribute("size")) c.removeAttribute("size");
  }
  if (page) {
    c.setAttribute("page", page.toString());
  } else {
    if (c.hasAttribute("page")) c.removeAttribute("page");
  }
  if (primarycolor) {
    c.setAttribute("primarycolor", primarycolor);
  } else {
    if (c.hasAttribute("primarycolor")) c.removeAttribute("primarycolor");
  }

  return c;
};
