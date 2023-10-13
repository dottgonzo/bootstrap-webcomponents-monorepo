import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/messages-list/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "messages/messageslist",
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

export const messageslist0 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const messageslist1 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

