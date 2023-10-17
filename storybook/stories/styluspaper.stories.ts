
import "./main.css";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import type { Meta } from "@storybook/html";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/stylus-paper/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "input/Stylus Paper",
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

export const withPressure = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const withSimulatePressure = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

export const ThinBrushOnBackground = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[3]),
};

export const BigBrushColor = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[4]),
};

export const LoadDraw = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[5]),
};

export const LoadImage = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[6]),
};

export const LoadTxt = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[7]),
};

