import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/input-number/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "input/inputnumber",
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

export const inputnumber0 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const inputnumber1 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const inputnumber2 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

export const inputnumber3 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[3]),
};

