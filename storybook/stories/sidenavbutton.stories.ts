
import "./main.css";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import type { Meta } from "@storybook/html";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/sidenav-button/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "basic/Sidenav Button",
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

export const selected = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const switcher = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

export const checkbox = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[3]),
};

export const radio = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[4]),
};

