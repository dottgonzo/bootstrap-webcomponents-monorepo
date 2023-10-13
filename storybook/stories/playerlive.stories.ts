
import "./main.css";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import type { Meta } from "@storybook/html";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/player-live/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "basic/playerlive",
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

export const playerlive0 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const playerlive1 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const playerlive2 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

export const playerlive3 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[3]),
};

export const playerlive4 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[4]),
};

export const playerlive5 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[5]),
};

export const playerlive6 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[6]),
};

