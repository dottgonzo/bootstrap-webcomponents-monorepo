
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
  title: "basic/playerlivecameraptz",
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

export const playerlivecameraptz0 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const playerlivecameraptz1 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const playerlivecameraptz2 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

export const playerlivecameraptz3 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[3]),
};

export const playerlivecameraptz4 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[4]),
};

