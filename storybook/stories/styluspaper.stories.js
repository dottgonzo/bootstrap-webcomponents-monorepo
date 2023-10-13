import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/stylus-paper/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "input/styluspaper",
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

export const styluspaper0 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const styluspaper1 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const styluspaper2 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

export const styluspaper3 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[3]),
};

export const styluspaper4 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[4]),
};

export const styluspaper5 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[5]),
};

export const styluspaper6 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[6]),
};

export const styluspaper7 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[7]),
};

