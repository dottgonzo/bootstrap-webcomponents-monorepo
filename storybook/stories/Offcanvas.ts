interface INavLink {
  key: string;
  icon: string;
  group: string;
  label: string;
}

export interface OffcanvasProps {
  navlinks?: INavLink[];
  id: string;
  opened?: boolean;
  navpage?: string;
  pagechange?: (p) => void;
  sidebarswitch?: (p) => void;
}

export const createOffcanvas = ({
  id,
  navlinks,
  opened,
  sidebarswitch,
  pagechange,
  navpage,
}: OffcanvasProps) => {
  if (!document.getElementById("offcanvasscript")) {
    const script = document.createElement("script");
    script.id = "offcanvasscript";
    script.src = "http://localhost:6006/offcanvas/dist/offcanvas.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("offcanvas-component");
    c.id = id;
    c.addEventListener("pagechange", (p: any) => pagechange(p.detail));
    c.addEventListener("sidebarswitch", (p: any) => sidebarswitch(p.detail));
    c.innerHTML = `<button slot="test" onclick="document.getElementsByTagName('offcanvas-component')[0].setAttribute('opened', 'yes')">test</button>`;
  }

  if (opened) {
    c.setAttribute("opened", "yes");
  } else {
    if (c.hasAttribute("opened")) c.removeAttribute("opened");
  }
  if (navlinks) {
    c.setAttribute("navlinks", JSON.stringify(navlinks));
  } else {
    if (c.hasAttribute("navlinks")) c.removeAttribute("navlinks");
  }
  if (navpage) {
    c.setAttribute("navpage", navpage);
  } else {
    if (c.hasAttribute("navpage")) c.removeAttribute("navpage");
  }

  // if (!document.getElementById("openbutton")) {
  //   const b = document.createElement(`button`);
  //   b.onclick = function () {
  //     document
  //       .getElementsByTagName("offcanvas-component")[0]
  //       .setAttribute("opened", "yes");
  //   };
  //   b.id = "openbutton";
  //   b.innerHTML = `test`;
  //   document.body.appendChild(b);
  // }

  return c;
};
