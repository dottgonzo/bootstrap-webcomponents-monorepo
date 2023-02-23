import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import lernaPkg from "../../lerna.json";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/messages-send/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
meta.parameters = { layout: "fullscreen" };

export default meta;

const Template: Story = (args) =>
  webComponentBind(
    args,
    meta.argTypes as any,
    componentSetup.repoName,
    lernaPkg.version
  );

export const MessageSendDefault = Template.bind({});

MessageSendDefault.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "default") ||
    (undefined as any)
);

export const MessageSendWithAMessage = Template.bind({});

MessageSendWithAMessage.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "withAMessage") ||
    (undefined as any)
);
export const MessageSendWithABigMessage = Template.bind({});

MessageSendWithABigMessage.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "withABigMessage") ||
    (undefined as any)
);
