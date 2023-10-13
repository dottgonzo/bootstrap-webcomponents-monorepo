import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/dashboard-counter-lines/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "dashboard/dashboardcounterlines",
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

export const dashboardcounterlines0 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const dashboardcounterlines1 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const dashboardcounterlines2 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

export const dashboardcounterlines3 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[3]),
};

