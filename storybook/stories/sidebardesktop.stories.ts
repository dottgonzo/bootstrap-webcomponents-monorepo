
import "./main.css";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import type { Meta } from "@storybook/html";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/sidebar-desktop/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "layout/sidebardesktop",
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

export const sidebardesktop0 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const sidebardesktop1 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const sidebardesktop2 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

export const sidebardesktop3 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[3]),
};

export const sidebardesktop4 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[4]),
};

export const sidebardesktop5 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[5]),
};

export const sidebardesktop6 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[6]),
};

export const sidebardesktop7 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[7]),
};

