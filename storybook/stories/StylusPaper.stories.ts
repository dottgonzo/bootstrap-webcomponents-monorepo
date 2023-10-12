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
} from "../../packages/stylus-paper/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "Editor/StylusPaper",
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

export const Main = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const WithPressure = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const WithSimulatePressure = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

export const WithThinBrush = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[3]),
};

export const WithBigBrush = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[4]),
};

export const LoadDraw = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[5]),
};

export const LoadImage = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[6]),
};

export const LoadText = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[7]),
};
