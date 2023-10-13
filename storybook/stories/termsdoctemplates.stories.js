import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/terms-doc-templates/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "docs/termsdoctemplates",
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

export const termsdoctemplates0 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const termsdoctemplates1 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const termsdoctemplates2 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

export const termsdoctemplates3 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[3]),
};

