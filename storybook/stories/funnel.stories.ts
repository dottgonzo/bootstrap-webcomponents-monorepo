
import "./main.css";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import type { Meta } from "@storybook/html";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/funnel/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "form/funnel",
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

export const funnel0 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const funnel1 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const funnel2 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

export const funnel3 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[3]),
};

