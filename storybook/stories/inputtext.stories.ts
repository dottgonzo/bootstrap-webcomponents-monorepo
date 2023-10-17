
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
  title: "input/Input Text",
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

export const Base = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const defaultRequired = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const requiredwithmin = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

export const requiredwithmax = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[3]),
};

export const requiredwithminmax = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[4]),
};

export const requiredwithregex = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[5]),
};

