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
} from "../../packages/funnel/extra/docs";

const preferences = [
  {
    type: "text",
    placeholder: "Inserisci titolo di default",
    id: "defaultTitle",
    required: true,

    label: "Titolo di default",
    value: "numtest",
    params: {
      min: 8,
      max: 120,
    },
  },
  {
    type: "number",
    id: "age",
    required: true,
    label: "Age",
    value: 9,
    params: {
      min: 8,
      max: 120,
    },
    validationTip: "Min 8, Max 120",
  },
];
const preferences2 = [
  {
    type: "text",
    placeholder: "Inserisci titolo di default2",
    id: "defaultTitle2",
    required: true,

    label: "Titolo di default2",
    value: "ntest2",
    params: {
      min: 8,
      max: 120,
    },
  },
  {
    type: "number",
    id: "age2",
    required: true,
    label: "Age2",
    value: 20,
    params: {
      min: 8,
      max: 120,
    },
    validationTip: "Min 8, Max 120",
  },
];
const preferences3 = [
  {
    type: "text",
    placeholder: "Inserisci titolo di default3",
    id: "defaultTitle3",
    required: true,

    label: "Titolo di default3",
    value: "ntest3",
    params: {
      min: 8,
      max: 120,
    },
  },
];
const preferences4 = [
  {
    type: "text",
    placeholder: "Inserisci titolo di default4",
    id: "defaultTitle4",
    required: true,

    label: "Titolo di default4",
    value: "ntest36666666",
    params: {
      min: 8,
      max: 120,
    },
  },
];
const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "Form/Funnel",
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

export const BasicFunnelTemplate = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "BasicFunnelTemplate") ||
    (undefined as any)
);
export const BasicFunnelTemplateWith2StepsSchema = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find(
    (f) => f.name === "BasicFunnelTemplateWith2StepsSchema"
  ) || (undefined as any)
);
export const BasicFunnelTemplateWith3StepsSchema = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find(
    (f) => f.name === "BasicFunnelTemplateWith3StepsSchema"
  ) || (undefined as any)
);
export const BasicFunnelTemplateWith4StepsSchema = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find(
    (f) => f.name === "BasicFunnelTemplateWith4StepsSchema"
  ) || (undefined as any)
);
