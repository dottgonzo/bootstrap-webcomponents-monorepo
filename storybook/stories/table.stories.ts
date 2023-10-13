
import "./main.css";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import type { Meta } from "@storybook/html";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/table/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "table/table",
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

export const table0 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const table1 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const table2 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

export const table3 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[3]),
};

export const table4 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[4]),
};

export const table5 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[5]),
};

export const table6 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[6]),
};

export const table7 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[7]),
};

export const table8 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[8]),
};

