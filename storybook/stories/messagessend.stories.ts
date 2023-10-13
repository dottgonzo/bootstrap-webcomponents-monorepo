
import "./main.css";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import type { Meta } from "@storybook/html";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/messages-send/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "messages/messagessend",
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

export const messagessend0 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const messagessend1 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const messagessend2 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

