
import "./main.css";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import type { Meta } from "@storybook/html";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/form-composer/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "form/Form Composer",
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

export const Base = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const debug = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const debugdefault = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

