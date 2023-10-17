
import "./main.css";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import type { Meta } from "@storybook/html";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/form/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "form/Form",
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

export const BasicFormHost = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const FormHostWithFileTemplate = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const FormHostTemplateCompiled = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

export const FormHostTemplateConditional = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[3]),
};

export const FormHostTemplateConditionalAndColumns = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[4]),
};

export const FormHostTemplateWithArrayProp = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[5]),
};

