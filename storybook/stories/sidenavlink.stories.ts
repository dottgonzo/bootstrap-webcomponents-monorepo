
import "./main.css";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import type { Meta } from "@storybook/html";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/sidenav-link/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "basic/sidenavlink",
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

export const sidenavlink0 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const sidenavlink1 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const sidenavlink2 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

