
import "./main.css";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import type { Meta } from "@storybook/html";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/form/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "form/form",
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

export const form0 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const form1 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const form2 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

export const form3 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[3]),
};

export const form4 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[4]),
};

export const form5 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[5]),
};

