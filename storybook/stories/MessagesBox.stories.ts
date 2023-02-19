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
} from "../../packages/messages-box/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
meta.parameters = { layout: "fullscreen" };

export default meta;

const Template: Story = (args) =>
  webComponentBind(
    args,
    meta.argTypes as any,
    componentSetup.repoName,
    version
  );

export const MessageBoxDefault = Template.bind({});

MessageBoxDefault.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "default") ||
    (undefined as any)
);

export const MessageBoxWithAMessage = Template.bind({});

MessageBoxWithAMessage.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "withAMessage") ||
    (undefined as any)
);

export const MessageBoxWithMoreMessages = Template.bind({});

MessageBoxWithMoreMessages.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "moreMessages") ||
    (undefined as any)
);
