import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/form-composer/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "form/formcomposer",
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

export const formcomposer0 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const formcomposer1 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const formcomposer2 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

