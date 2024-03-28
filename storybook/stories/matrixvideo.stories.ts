
import "./main.css";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import type { Meta } from "@storybook/html";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/matrix-video/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "components/Matrix Video",
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

export const with2videos = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const with3videos = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const with4videos = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

export const with6videos = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[3]),
};

export const with7videos = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[4]),
};

export const with8videos = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[5]),
};

export const with9videos = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[6]),
};

export const with10videos = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[7]),
};

export const with12videos = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[8]),
};

export const with13videos = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[9]),
};

export const with15videos = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[10]),
};

export const with16videos = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[11]),
};

export const with18videos = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[12]),
};

export const with20videos = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[13]),
};

export const with30videos = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[14]),
};

