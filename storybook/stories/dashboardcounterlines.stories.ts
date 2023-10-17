
import "./main.css";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import type { Meta } from "@storybook/html";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/dashboard-counter-lines/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "dashboard/Dashboard Counter Lines",
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

export const default2 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const default3 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

export const default4 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[3]),
};

