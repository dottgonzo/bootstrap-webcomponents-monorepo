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
} from "../../packages/player-input-streaming/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(
    args,
    meta.argTypes as any,
    componentSetup.repoName,
    version
  );

export const PlayerInputStreamingDefault = Template.bind({});

PlayerInputStreamingDefault.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "default")
);
