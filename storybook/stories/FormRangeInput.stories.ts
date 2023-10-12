import "./main.css";
import type { Meta } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import lernaPkg from "../../lerna.json";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/input-range/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "Input/Range",
  tags: ["autodocs"],

  parameters: meta.parameters,

  argTypes: meta.argTypes,
  render: ({ label, ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    // @ts-ignore
    return webComponentBind(
      args,
      meta.argTypes,
      componentSetup.repoName,
      lernaPkg.version
    );
  },
};

export const FormRangeInputRequired = {
  args: setStorybookData(
    componentSetup.name,
    componentSetup.examples.find((f) => f.name === "required") ||
      (undefined as any)
  ),
};

export const FormRangeInputwithmin = {
  args: setStorybookData(
    componentSetup.name,
    componentSetup.examples.find((f) => f.name === "withmin") ||
      (undefined as any)
  ),
};

export const FormRangeInputwithmax = {
  args: setStorybookData(
    componentSetup.name,
    componentSetup.examples.find((f) => f.name === "withmax") ||
      (undefined as any)
  ),
};

export const FormRangeInputwithminmax = {
  args: setStorybookData(
    componentSetup.name,
    componentSetup.examples.find((f) => f.name === "withminmax") ||
      (undefined as any)
  ),
};
