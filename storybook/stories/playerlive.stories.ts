
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
  title: "basic/Player Live",
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

export const LiveVideoPlayerWithWidth = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const LiveVideoPlayerWithHeight = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

export const LiveVideoPlayerWithoutUri = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[3]),
};

export const LiveVideoPlayerWithText3 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[4]),
};

export const LiveVideoPlayerWithText2 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[5]),
};

export const LiveVideoPlayerWithText1 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[6]),
};

