import pkg from "../../lerna.json";

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
  if (!document.getElementById("hb-editor-video-script")) {
    const script = document.createElement("script");
    script.id = "hb-editor-video-script";

    script.src = !window.location.href.includes("localhost")
      ? `https://cdn.jsdelivr.net/npm/@htmlbricks/hb-editor-video@${pkg.version}/release/release.js`
      : "http://localhost:6006/editor-video/dist/release.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("hb-editor-video");
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
