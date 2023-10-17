
import "./main.css";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import type { Meta } from "@storybook/html";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/paragraps-around-image/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "site/Paragraps Around Image",
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

export const default2 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const default4 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const default6 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

