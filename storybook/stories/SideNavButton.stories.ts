import "./main.css";
import type { Meta } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import lernaPkg from "../../lerna.json";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/sidenav-button/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "Layout/SideNavButton",
  tags: ["autodocs"],

  parameters: meta.parameters,

  argTypes: meta.argTypes,
  render: ({ label, ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    // @ts-ignore
    return webComponentBind(
      args,
      meta.argTypes,
      componentSetup.repoName,
      lernaPkg.version
    );
  },
};

export const SideNavButtonDefault = {
  args: setStorybookData(
    componentSetup.name,
    componentSetup.examples.find((f) => f.name === "default") ||
      (undefined as any)
  ),
};
export const SideNavButtonSelected = {
  args: setStorybookData(
    componentSetup.name,
    componentSetup.examples.find((f) => f.name === "selected") ||
      (undefined as any)
  ),
};
export const SideNavButtonSwitch = {
  args: setStorybookData(
    componentSetup.name,
    componentSetup.examples.find((f) => f.name === "switch") ||
      (undefined as any)
  ),
};
export const SideNavButtonCheckbox = {
  args: setStorybookData(
    componentSetup.name,
    componentSetup.examples.find((f) => f.name === "checkbox") ||
      (undefined as any)
  ),
};

export const SideNavButtonRadio = {
  args: setStorybookData(
    componentSetup.name,
    componentSetup.examples.find((f) => f.name === "radio") ||
      (undefined as any)
  ),
};
