
import "./main.css";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import type { Meta } from "@storybook/html";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/input-date/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "input/Input Date",
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

export const from27Febb2022 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const to27Febb2022 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

export const in27Febb2022 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[3]),
};

export const date27Febb2023 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[4]),
};

