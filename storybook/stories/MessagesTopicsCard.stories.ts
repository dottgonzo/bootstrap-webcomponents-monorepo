import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/messages-topics-card/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
meta.parameters = { layout: "fullscreen" };

export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes as any, componentSetup.name);

export const MessageTopicsCardDefault = Template.bind({});

MessageTopicsCardDefault.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "default")
);
export const MessageTopicsCardSelected = Template.bind({});

MessageTopicsCardSelected.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "selected"),
  {}
);
