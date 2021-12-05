export interface VideoeditorProps {
  id: string;
  changeTrackValues?: (d) => void;
  dispatchTracks?: (d) => void;
}
export const createVideoeditor = ({
  id,
  changeTrackValues,
  dispatchTracks,
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
    c.addEventListener("dispatchTracks", (i: any) => dispatchTracks(i.detail));
  }

  return c;
};
