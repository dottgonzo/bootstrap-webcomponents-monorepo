export interface VideoeditorProps {
  id: string;
  track?: {
    name: string;
    minValue: number;
    maxValue: number;
  };
  changeTrackValues?: (d) => void;
  dispatchTrack?: (d) => void;
}
export const createVideoeditor = ({
  id,
  track,
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
    c.setAttribute("tracks", JSON.stringify(track));
  } else {
    if (c.hasAttribute("tracks")) c.removeAttribute("tracks");
  }

  return c;
};
