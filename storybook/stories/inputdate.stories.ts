
import "./main.css";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import type { Meta } from "@storybook/html";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/input-date/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "input/inputdate",
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

export const inputdate0 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const inputdate1 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const inputdate2 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

export const inputdate3 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[3]),
};

export const inputdate4 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[4]),
};

