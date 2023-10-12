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
} from "../../packages/input-date/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "Input/DateInput",
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

export const FormDateInputDefault = {
  args: setStorybookData(
    componentSetup.name,
    componentSetup.examples.find((f) => f.name === "default") ||
      (undefined as any)
  ),
};
export const FormDateInputFrom27Febb2022 = {
  args: setStorybookData(
    componentSetup.name,
    componentSetup.examples.find((f) => f.name === "from27Febb2022") ||
      (undefined as any)
  ),
};
export const FormDateInputTo27Febb2022 = {
  args: setStorybookData(
    componentSetup.name,
    componentSetup.examples.find((f) => f.name === "to27Febb2022") ||
      (undefined as any)
  ),
};
export const FormDateInputIn27Febb2022 = {
  args: setStorybookData(
    componentSetup.name,
    componentSetup.examples.find((f) => f.name === "in27Febb2022") ||
      (undefined as any)
  ),
};
export const FormDateInputDate27Febb2023 = {
  args: setStorybookData(
    componentSetup.name,
    componentSetup.examples.find((f) => f.name === "date27Febb2023") ||
      (undefined as any)
  ),
};
