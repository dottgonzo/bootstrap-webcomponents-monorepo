
import "./main.css";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import type { Meta } from "@storybook/html";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/form-contact/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "site/Form Contact",
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

export const FormContact1 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const FormContact2 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const FormContact3 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

export const FormContactWithCaptcha = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[3]),
};

