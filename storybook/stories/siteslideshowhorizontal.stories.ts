
import "./main.css";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import type { Meta } from "@storybook/html";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/site-slideshow-horizontal/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "archives/siteslideshowhorizontal",
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

export const siteslideshowhorizontal0 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const siteslideshowhorizontal1 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

