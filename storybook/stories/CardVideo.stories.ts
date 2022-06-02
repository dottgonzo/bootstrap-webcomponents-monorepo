import { Story, Meta } from "@storybook/html";
import {
  webComponentBind,
  argTypesExtraUtils,
  toPascalCase,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/card-video/extra/docs";

const copy1 = Object.assign({}, argTypesExtraUtils);
const copy2 = Object.assign({}, storybookArgs);

const assigned = Object.assign({}, copy1, copy2);
const meta: Meta = {
  title:
    componentSetup.category +
    "/" +
    toPascalCase(componentSetup.name.replace("hb-", "")),
  argTypes: assigned,
};

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
