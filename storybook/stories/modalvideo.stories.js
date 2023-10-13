import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/modal-video/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "basic/modalvideo",
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

export const modalvideo0 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

