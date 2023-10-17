
import "./main.css";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import type { Meta } from "@storybook/html";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/terms-doc-templates/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "docs/Terms Doc Templates",
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

export const italian = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const cookieit = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const cookieen = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

export const cookieen_no_data = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[3]),
};

