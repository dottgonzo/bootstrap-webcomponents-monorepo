import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/messages-send/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
meta.parameters = { layout: "fullscreen" };

export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes as any, componentSetup.repoName);

export const MessageSendDefault = Template.bind({});

MessageSendDefault.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "default")
);

export const MessageSendWithAMessage = Template.bind({});

MessageSendWithAMessage.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "withAMessage")
);
export const MessageSendWithABigMessage = Template.bind({});

MessageSendWithABigMessage.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "withABigMessage")
);
