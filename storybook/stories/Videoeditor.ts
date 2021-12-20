export interface VideoeditorProps {
  id: string;
  src: string;
  track?: {
    minValue: number;
    maxValue: number;
  };
  form;
  changeTrackValues?: (d) => void;
  dispatchTrack?: (d) => void;
}
export const createVideoeditor = ({
  id,
  track,
  src,
  form,
  changeTrackValues,
  dispatchTrack,
}: VideoeditorProps) => {
  if (!document.getElementById("videoeditorbootstrapscript")) {
    const script = document.createElement("script");
    script.id = "videoeditorbootstrapscript";
    script.src =
      "http://localhost:6006/videoeditor/dist/videoeditorbootstrap.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("videoeditorbootstrap-component");
    c.id = id;
    c.addEventListener("changeTrackValues", (i: any) =>
      changeTrackValues(i.detail)
    );
    c.addEventListener("dispatchTrack", (i: any) => dispatchTrack(i.detail));
  }
  if (track) {
    c.setAttribute("track", JSON.stringify(track));
  } else {
    if (c.hasAttribute("track")) c.removeAttribute("track");
  }
  if (src) {
    c.setAttribute("src", src);
  } else {
    if (c.hasAttribute("src")) c.removeAttribute("src");
  }
  if (form) {
    c.setAttribute("form", JSON.stringify(form));
  } else {
    if (c.hasAttribute("form")) c.removeAttribute("form");
  }
  return c;
};
