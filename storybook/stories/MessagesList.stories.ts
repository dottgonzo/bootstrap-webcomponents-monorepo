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
} from "../../packages/messages-list/extra/docs";

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

export const MessageListDefault = Template.bind({});

MessageListDefault.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "default")
);

export const MessageListWithMoreMessages = Template.bind({});

MessageListWithMoreMessages.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "moreMessages")
);
