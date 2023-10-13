import "./main.css";
import type { Meta } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/form/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "Form/Form",
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

export const BasicFormHost = {
  args: {
    args: setStorybookData(
      componentSetup.name,
      componentSetup.examples.find((f) => f.name === "BasicFormHost") ||
        (undefined as any)
    ),
  },
};
export const FormHostWithFileTemplate = {
  args: {
    args: setStorybookData(
      componentSetup.name,
      componentSetup.examples.find(
        (f) => f.name === "FormHostWithFileTemplate"
      ) || (undefined as any)
    ),
  },
};
export const FormHostTemplateCompiled = {
  args: {
    args: setStorybookData(
      componentSetup.name,
      componentSetup.examples.find(
        (f) => f.name === "FormHostTemplateCompiled"
      ) || (undefined as any)
    ),
  },
};
export const FormHostTemplateConditional = {
  args: {
    args: setStorybookData(
      componentSetup.name,
      componentSetup.examples.find(
        (f) => f.name === "FormHostTemplateConditional"
      ) || (undefined as any)
    ),
  },
};
export const FormHostTemplateConditionalAndColumns = {
  args: {
    args: setStorybookData(
      componentSetup.name,
      componentSetup.examples.find(
        (f) => f.name === "FormHostTemplateConditionalAndColumns"
      ) || (undefined as any)
    ),
  },
};
export const FormHostTemplateWithArrayProp = {
  args: {
    args: setStorybookData(
      componentSetup.name,
      componentSetup.examples.find(
        (f) => f.name === "FormHostTemplateWithArrayProp"
      ) || (undefined as any)
    ),
  },
};
