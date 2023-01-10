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

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes as any, componentSetup.name);

export const LiveVideoPlayer = Template.bind({});

LiveVideoPlayer.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "default")
);
export const LiveVideoPlayerWithWidth = Template.bind({});
LiveVideoPlayerWithWidth.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "LiveVideoPlayerWithWidth")
);
export const LiveVideoPlayerWithHeight = Template.bind({});

LiveVideoPlayerWithHeight.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "LiveVideoPlayerWithHeight")
);
export const LiveVideoPlayerWithoutUri = Template.bind({});

LiveVideoPlayerWithoutUri.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "LiveVideoPlayerWithoutUri")
);

export const LiveVideoPlayerWithText3 = Template.bind({});

LiveVideoPlayerWithText3.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "LiveVideoPlayerWithText3")
);

export const LiveVideoPlayerWithText2 = Template.bind({});

LiveVideoPlayerWithText2.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "LiveVideoPlayerWithText2")
);

export const LiveVideoPlayerWithText1 = Template.bind({});

LiveVideoPlayerWithText1.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "LiveVideoPlayerWithText1")
);
