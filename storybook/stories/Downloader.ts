import pkg from "../../lerna.json";

export interface DownloaderProps {
  id: string;
  uri: string;
  headers: any;
  downloadid: string;
  targetfilename: string;
}

export const createDownloader = ({
  id,
  uri,
  headers,
  downloadid,
  targetfilename,
}: DownloaderProps) => {
  if (!document.getElementById("hb-downloader-script")) {
    const script = document.createElement("script");
    script.id = "hb-downloader-script";

    script.src = !window.location.href.includes("localhost")
      ? `https://cdn.jsdelivr.net/npm/@htmlbricks/hb-downloader@${pkg.version}/release/release.js`
      : "http://localhost:6006/downloader/dist/release.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("hb-downloader");
    c.id = id;
  }
  if (uri) {
    c.setAttribute("uri", uri);
  } else {
    if (c.hasAttribute("uri")) c.removeAttribute("uri");
  }
  if (headers) {
    c.setAttribute("headers", JSON.stringify(headers));
  } else {
    if (c.hasAttribute("headers")) c.removeAttribute("headers");
  }
  if (downloadid) {
    c.setAttribute("downloadid", downloadid);
  } else {
    if (c.hasAttribute("downloadid")) c.removeAttribute("downloadid");
  }
  if (targetfilename) {
    c.setAttribute("targetfilename", targetfilename);
  } else {
    if (c.hasAttribute("targetfilename")) c.removeAttribute("targetfilename");
  }
  return c;
};
