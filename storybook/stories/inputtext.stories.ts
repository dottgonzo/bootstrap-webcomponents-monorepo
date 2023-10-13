
import "./main.css";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import type { Meta } from "@storybook/html";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/input-text/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "input/inputtext",
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

export const inputtext0 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const inputtext1 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const inputtext2 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

export const inputtext3 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[3]),
};

export const inputtext4 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[4]),
};

export const inputtext5 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[5]),
};

