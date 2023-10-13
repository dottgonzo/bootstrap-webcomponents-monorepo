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
} from "../../packages/input-radio/extra/docs";

const inputEntry1 = {
  type: "radio",
  placeholder: "Choose here...",
  id: "check0",
  required: true,
  label: "Check 0",
  validationTip: "Check 1",
  group: "ciao",
  params: {
    options: [
      { label: "777", value: "555" },
      { label: "testlabel", value: "testvalue" },
    ],
  },
};
const inputEntry2 = {
  type: "radio",
  placeholder: "Choose here...",
  id: "check0",
  required: true,
  label: "Check 0",
  validationTip: "Check 1",
  group: "ciao",
  params: {
    options: [
      { label: "ee", value: "aaa" },
      { label: "testlabel", value: "testvalue" },
    ],
  },
  value: "testvalue",
};
const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "Input/Radio",
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

export const FormRadioInputTemplate = {
  args: {
    id: "FormRadioInputTemplate",
    schemaentry: inputEntry1,
  },
};

export const FormRadioInputTemplate2s = {
  args: {
    id: "FormRadioInputTemplate2",
    schemaentry: inputEntry2,
    show_validation: true,
  },
};
