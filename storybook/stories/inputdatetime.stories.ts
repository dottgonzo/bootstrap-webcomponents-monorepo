
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
  title: "input/Input Datetime",
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

export const empty = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const emptyRequired = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const withValue = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

export const maxDate27Feb2023 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[3]),
};

export const minDate27Feb2023 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[4]),
};

export const rangeDate27Feb2023 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[5]),
};

