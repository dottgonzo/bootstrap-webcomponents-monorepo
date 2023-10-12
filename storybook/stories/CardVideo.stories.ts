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
} from "../../packages/card-video/extra/docs";

const videosrc =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
const title = "aa";
const description = "6";
const datetest = "2021-08-15T18:55:22.135Z";
const youtubevideosrc = "https://www.youtube.com/embed/tgbNymZ7vqY";
const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "Components/CardVideo",
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

export const BasicVideoCard = {
  args: {
    videosrc,
    title,
    description,
    time: datetest,
    id: "BasicVideoCard",
  },
};
export const YoutubeCard = {
  args: {
    videosrc: youtubevideosrc,
    title,
    description,
    time: datetest,
    id: "YoutubeCard",
    provider: "youtube",
  },
};
