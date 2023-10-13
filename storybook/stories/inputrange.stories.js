import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/input-range/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "input/inputrange",
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

export const inputrange0 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const inputrange1 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const inputrange2 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

export const inputrange3 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[3]),
};

