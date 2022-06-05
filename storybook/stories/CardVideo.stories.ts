import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/card-video/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const videosrc =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
const title = "aa";
const description = "6";
const datetest = "2021-08-15T18:55:22.135Z";
const youtubevideosrc = "https://www.youtube.com/embed/tgbNymZ7vqY";
const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, componentSetup.name);

export const BasicVideoCard = Template.bind({});
BasicVideoCard.args = {
  videosrc,
  title,
  description,
  time: datetest,
  id: "BasicVideoCard",
};
export const YoutubeCard = Template.bind({});
YoutubeCard.args = {
  videosrc: youtubevideosrc,
  title,
  description,
  time: datetest,
  id: "YoutubeCard",
  provider: "youtube",
};
