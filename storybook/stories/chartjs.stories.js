import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/chartjs/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "graph/chartjs",
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

export const chartjs0 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

