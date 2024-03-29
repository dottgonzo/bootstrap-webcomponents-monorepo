
import "./main.css";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import type { Meta } from "@storybook/html";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/input-range/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "input/Input Range",
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

export const required = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const withmin = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const withmax = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

export const withminmax = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[3]),
};

