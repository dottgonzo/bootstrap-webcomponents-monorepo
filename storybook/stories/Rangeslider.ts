export interface RangesliderProps {
  id: string;
}
export const createRangeslider = ({ id }: RangesliderProps) => {
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

  return c;
};
