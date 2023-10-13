import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/sidenav-button/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "basic/sidenavbutton",
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

export const sidenavbutton0 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const sidenavbutton1 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const sidenavbutton2 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

export const sidenavbutton3 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[3]),
};

export const sidenavbutton4 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[4]),
};

