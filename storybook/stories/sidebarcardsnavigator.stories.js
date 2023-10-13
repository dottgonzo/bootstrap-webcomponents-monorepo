import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/sidebar-cards-navigator/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "layout/sidebarcardsnavigator",
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

export const sidebarcardsnavigator0 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const sidebarcardsnavigator1 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const sidebarcardsnavigator2 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

