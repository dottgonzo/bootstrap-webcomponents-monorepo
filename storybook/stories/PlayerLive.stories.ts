import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/player-live/extra/docs";

const mediauri = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
const replacewithtext1 = {
  title: "title",
};
const replacewithtext2 = {
  title: "title",
  subtitle: "subtitle",
};
const replacewithtext3 = {
  title: "title",
  subtitle: "subtitle",
  text: "text",
};

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes as any, componentSetup.name);

export const LiveVideoPlayer = Template.bind({});

LiveVideoPlayer.args = {
  id: "LiveVideoPlayer",
  mediauri,
};
export const LiveVideoPlayerWithWidth = Template.bind({});
LiveVideoPlayerWithWidth.args = {
  width: 400,
  id: "LiveVideoPlayerWithWidth",
  mediauri,
};
export const LiveVideoPlayerWithHeight = Template.bind({});

LiveVideoPlayerWithHeight.args = {
  height: 400,
  id: "LiveVideoPlayerWithHeight",
  mediauri,
};
export const LiveVideoPlayerWithoutUri = Template.bind({});

LiveVideoPlayerWithoutUri.args = {
  height: 400,
  id: "LiveVideoPlayerWithoutUri",
};

export const LiveVideoPlayerWithText3 = Template.bind({});

LiveVideoPlayerWithText3.args = {
  height: 400,
  id: "LiveVideoPlayerWithText3",
  replacewithtext: replacewithtext3,
  mediauri: "8446648",
};

export const LiveVideoPlayerWithText2 = Template.bind({});

LiveVideoPlayerWithText2.args = {
  height: 400,
  id: "LiveVideoPlayerWithText2",
  replacewithtext: replacewithtext2,
  mediauri: "8446648",
};

export const LiveVideoPlayerWithText1 = Template.bind({});

LiveVideoPlayerWithText1.args = {
  height: 400,
  id: "LiveVideoPlayerWithText1",
  replacewithtext: replacewithtext1,
  mediauri: "8446648",
};
