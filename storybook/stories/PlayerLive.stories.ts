import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import { version } from "../../lerna.json";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/player-live/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(
    args,
    meta.argTypes as any,
    componentSetup.repoName,
    version
  );

export const LiveVideoPlayer = Template.bind({});

LiveVideoPlayer.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "default") ||
    (undefined as any)
);
export const LiveVideoPlayerWithWidth = Template.bind({});
LiveVideoPlayerWithWidth.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "LiveVideoPlayerWithWidth") ||
    (undefined as any)
);
export const LiveVideoPlayerWithHeight = Template.bind({});

LiveVideoPlayerWithHeight.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "LiveVideoPlayerWithHeight") ||
    (undefined as any)
);
export const LiveVideoPlayerWithoutUri = Template.bind({});

LiveVideoPlayerWithoutUri.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "LiveVideoPlayerWithoutUri") ||
    (undefined as any)
);

export const LiveVideoPlayerWithText3 = Template.bind({});

LiveVideoPlayerWithText3.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "LiveVideoPlayerWithText3") ||
    (undefined as any)
);

export const LiveVideoPlayerWithText2 = Template.bind({});

LiveVideoPlayerWithText2.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "LiveVideoPlayerWithText2") ||
    (undefined as any)
);

export const LiveVideoPlayerWithText1 = Template.bind({});

LiveVideoPlayerWithText1.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "LiveVideoPlayerWithText1") ||
    (undefined as any)
);
