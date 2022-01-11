import dayjs from "dayjs";
import pkg from "../../lerna.json";

export interface VideoCardProps {
  id: string;
  videosrc: string;
  title?: string;
  description?: string;
  time?: string;
  provider?: "youtube";
}

export const createVideoCard = ({
  id,
  videosrc,
  title,
  description,
  time,
  provider,
}: VideoCardProps) => {
  if (!document.getElementById("hb-card-video-script")) {
    const script = document.createElement("script");
    script.id = "hb-card-video-script";

    script.src = !window.location.href.includes("localhost")
      ? `https://cdn.jsdelivr.net/npm/@htmlbricks/hb-card-video@${pkg.version}/release/release.js`
      : "http://localhost:6006/card-video/dist/release.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("hb-card-video");
    c.id = id;
  }

  if (title) {
    c.setAttribute("title", title);
  } else {
    if (c.hasAttribute("title")) c.removeAttribute("title");
  }
  if (provider) {
    c.setAttribute("provider", provider);
  } else {
    if (c.hasAttribute("provider")) c.removeAttribute("provider");
  }
  if (description) {
    c.setAttribute("description", description);
  } else {
    if (c.hasAttribute("description")) c.removeAttribute("description");
  }

  if (time) {
    console.log(time, dayjs(time).isValid());
    c.setAttribute("time", dayjs(time).format());
  } else {
    if (c.hasAttribute("time")) c.removeAttribute("time");
  }
  if (videosrc) {
    c.setAttribute("videosrc", videosrc);
  } else {
    if (c.hasAttribute("videosrc")) c.removeAttribute("videosrc");
  }

  return c;
};
