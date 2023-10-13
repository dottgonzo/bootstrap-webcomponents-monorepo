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
} from "../../packages/input-color/extra/docs";

const inputEntry1 = {
  placeholder: "Insert color...",
  id: "color1",
  required: true,
  label: "Last color",
  validationTip: "This field cannot be empty.",
  value: "#ffffff",
};

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "Input/FormColorInput",
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

export const FormColorInputTemplate = {
  args: {
    id: "BasicFormColorInput",
    schemaentry: inputEntry1,
  },
};
