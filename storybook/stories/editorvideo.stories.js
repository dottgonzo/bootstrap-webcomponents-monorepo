import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/editor-video/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "editor/editorvideo",
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

export const editorvideo0 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

