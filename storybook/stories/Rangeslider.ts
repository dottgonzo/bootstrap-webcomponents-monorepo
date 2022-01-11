import pkg from "../../lerna.json";

export interface RangesliderProps {
  id: string;
  min?: number;
  max?: number;
  minval?: number;
  maxval?: number;
  withbubbles?: boolean;
  changeRangeValues?: (d) => void;
}
export const createRangeslider = ({
  id,
  min,
  max,
  minval,
  maxval,
  withbubbles,
  changeRangeValues,
}: RangesliderProps) => {
  if (!document.getElementById("hb-range-slider-script")) {
    const script = document.createElement("script");
    script.id = "hb-range-slider-script";

    script.src = !window.location.href.includes("localhost")
      ? `https://cdn.jsdelivr.net/npm/@htmlbricks/hb-range-slider@${pkg.version}/release/release.js`
      : "http://localhost:6006/range-slider/dist/release.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("hb-range-slider");
    c.id = id;
    c.addEventListener("changeRangeValues", (i: any) =>
      changeRangeValues(i.detail)
    );
  }
  if (withbubbles) {
    c.setAttribute("withbubbles", "yes");
  } else {
    if (c.hasAttribute("withbubbles")) c.removeAttribute("withbubbles");
  }
  if (min) {
    c.setAttribute("min", min.toString());
  } else {
    if (c.hasAttribute("min")) c.removeAttribute("min");
  }
  if (max) {
    c.setAttribute("max", max.toString());
  } else {
    if (c.hasAttribute("max")) c.removeAttribute("max");
  }
  if (minval) {
    c.setAttribute("minval", minval.toString());
  } else {
    if (c.hasAttribute("minval")) c.removeAttribute("minval");
  }
  if (maxval) {
    c.setAttribute("maxval", maxval.toString());
  } else {
    if (c.hasAttribute("maxval")) c.removeAttribute("maxval");
  }
  return c;
};
