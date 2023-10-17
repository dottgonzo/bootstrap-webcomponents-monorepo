
import "./main.css";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import type { Meta } from "@storybook/html";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/player-live-camera-ptz/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "basic/Player Live Camera Ptz",
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

export const withPresets = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const withPresetSelected = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

export const withPanelClosed = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[3]),
};

export const disconnected = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[4]),
};

