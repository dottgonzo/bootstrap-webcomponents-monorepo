
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
  title: "layout/Sidebar Desktop",
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

export const sidebarOnSettings = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const sidebarWithGroups = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

export const sidebarWithGroupsOnSettings = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[3]),
};

export const sidebarWithAutoGroupsOnSettings = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[4]),
};

export const sidebarWithAutoGroupsOnSettingsAndBadge = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[5]),
};

export const sidebarWithFooter = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[6]),
};

export const sidebarMultilevel = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[7]),
};

