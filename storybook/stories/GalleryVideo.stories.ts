import "./main.css";
import type { Meta } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import lernaPkg from "../../lerna.json";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/gallery-video/extra/docs";

const cards = [
  {
    title: "bau",
    videoSrc:
      "https://comapi.be-on.tv/v1/public/records/61043eedb50af916a6429fdc/video",
    time: "2021-08-06T22:46:30.565Z",
  },
  {
    title: "bb1",
    videoSrc:
      "https://comapi.be-on.tv/v1/public/records/61043eedb50af916a6429fdc/video",
    time: "2021-08-06T22:46:31.565Z",
  },
  { title: "bb2", time: "2021-08-02T22:46:32.565Z" },
  {
    title: "ss",
    time: "2021-08-06T22:46:34.565Z",
    description: "fffffff",
    testnested: { nested: "dddd" },
  },
  {
    title: "bb4",
    time: "2021-08-06T22:46:34.565Z",
    videoSrc: "https://www.youtube.com/embed/tgbNymZ7vqY",
    provider: "youtube",
  },
  { title: "aa5", time: "2021-08-06T22:46:34.565Z" },
  { title: "bb6", time: "2021-08-06T22:46:34.565Z" },
  { title: "bb7", time: "2021-08-06T22:46:34.565Z" },
  { title: "bb8", time: "2021-08-06T22:46:34.565Z" },
  { title: "bb9", time: "2021-08-06T22:46:33.565Z" },
  { title: "bb10", time: "2021-08-06T22:46:34.565Z" },
  { title: "bb11", time: "2021-08-06T22:46:34.565Z" },
  {
    title: "bb12",
    time: "2021-08-06T22:46:34.565Z",
    videoSrc:
      "https://comapi.be-on.tv/v1/public/records/61043eedb50af916a6429fdc/video",
  },
  { title: "bb13", time: "2021-08-07T22:46:39.565Z" },
];
const headers = [
  {
    label: "title",
    key: "title",
    search: true,
  },
  {
    label: "description",
    key: "description",
  },
  {
    label: "nested",
    key: "testnested.nested",
  },
  {
    label: "data",
    key: "time",
    type: "datetime",
    format: "DD MMMM YYYY",
  },
];

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "Site/GalleryVideo",
  tags: ["autodocs"],

  parameters: meta.parameters,

  argTypes: meta.argTypes,
  render: ({ label, ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    // @ts-ignore
    return webComponentBind(
      args,
      meta.argTypes,
      componentSetup.repoName,
      lernaPkg.version
    );
  },
};

export const BasicVideoGallery = {
  args: {
    cards,
    headers,
    id: "BasicVideoGallery",
  },
};

export const BasicVideoGalleryRest = {
  args: {
    cards,
    headers,
    id: "BasicVideoGalleryRest",
    externalfilter: true,
  },
};

// BasicVideoGallery.parameters = {
//   docs: {
//     source: {
//       code: "Some custom string here",
//     },
//   },
// };
