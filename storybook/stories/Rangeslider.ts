export interface RangesliderProps {
  id: string;
  withbubbles?: boolean;
}
export const createRangeslider = ({ id, withbubbles }: RangesliderProps) => {
  if (!document.getElementById("rangesliderscript")) {
    const script = document.createElement("script");
    script.id = "rangesliderscript";
    script.src = "http://localhost:6006/rangeslider/dist/rangeslider.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("range-slider-component");
    c.id = id;
  }
  if (withbubbles) {
    c.setAttribute("withbubbles", "yes");
  } else {
    if (c.hasAttribute("withbubbles")) c.removeAttribute("withbubbles");
  }
  return c;
};
