export interface VideoeditorProps {
  id: string;
}
export const createVideoeditor = ({ id }: VideoeditorProps) => {
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
  }

  return c;
};
