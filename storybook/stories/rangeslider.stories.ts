
import "./main.css";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import type { Meta } from "@storybook/html";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/range-slider/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "basic/Range Slider",
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

export const withBubbles = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const withValues = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

export const withPositionValue = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[3]),
};

