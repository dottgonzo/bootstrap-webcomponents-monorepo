import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/messages-box/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes as any, componentSetup.name);

export const MessageBoxDefault = Template.bind({});

MessageBoxDefault.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "default")
);

export const MessageBoxWithAMessage = Template.bind({});

MessageBoxWithAMessage.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "withAMessage")
);
