import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/page-checkout/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "page/pagecheckout",
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

export const pagecheckout0 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

