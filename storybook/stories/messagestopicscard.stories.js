import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/messages-topics-card/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "messages/messagestopicscard",
  tags: ["autodocs"],

  parameters: meta.parameters,

  argTypes: meta.argTypes,
  render: ({ label, ...args }) => {
    return webComponentBind(
      args,
      meta.argTypes,
      componentSetup.repoName,
      lernaPkg.version
    );
  },
};

export const messagestopicscard0 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const messagestopicscard1 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

