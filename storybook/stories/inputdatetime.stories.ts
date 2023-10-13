
import "./main.css";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import type { Meta } from "@storybook/html";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/input-datetime/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "input/inputdatetime",
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

export const inputdatetime0 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const inputdatetime1 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const inputdatetime2 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

export const inputdatetime3 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[3]),
};

export const inputdatetime4 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[4]),
};

export const inputdatetime5 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[5]),
};

