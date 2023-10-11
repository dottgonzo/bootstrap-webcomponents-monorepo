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
} from "../../packages/input-number/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "Input/NumberInput",
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

export const FormNumberInputRequired = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "required") ||
    (undefined as any)
);
export const FormNumberInputwithmin = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "withmin") ||
    (undefined as any)
);
export const FormNumberInputwithmax = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "withmax") ||
    (undefined as any)
);
export const FormNumberInputwithminmax = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "withminmax") ||
    (undefined as any)
);
