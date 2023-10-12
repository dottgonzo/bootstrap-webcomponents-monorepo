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
} from "../../packages/input-text/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "Input/Text",
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

export const FormTextInputTemplate = {
  args: setStorybookData(
    componentSetup.name,
    componentSetup.examples.find((f) => f.name === "default") ||
      (undefined as any)
  ),
};
export const FormTextInputTemplateRequired = {
  args: setStorybookData(
    componentSetup.name,
    componentSetup.examples.find((f) => f.name === "defaultRequired") ||
      (undefined as any)
  ),
};
export const FormTextInputTemplateRequiredWithMin = {
  args: setStorybookData(
    componentSetup.name,
    componentSetup.examples.find((f) => f.name === "requiredwithmin") ||
      (undefined as any)
  ),
};
export const FormTextInputTemplateRequiredWithMax = {
  args: setStorybookData(
    componentSetup.name,
    componentSetup.examples.find((f) => f.name === "requiredwithmax") ||
      (undefined as any)
  ),
};
export const FormTextInputTemplateRequiredWithMaxMin = {
  args: setStorybookData(
    componentSetup.name,
    componentSetup.examples.find((f) => f.name === "requiredwithminmax") ||
      (undefined as any)
  ),
};
export const FormTextInputTemplateRequiredWithRegex = {
  args: setStorybookData(
    componentSetup.name,
    componentSetup.examples.find((f) => f.name === "requiredwithregex") ||
      (undefined as any)
  ),
};
