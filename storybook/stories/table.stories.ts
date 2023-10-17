
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
  title: "table/Table",
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

export const BasicTableWithClick = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const BasicTableWithMoreSearchAndSelect = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const BasicTableWithSearchOnNestedField = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

export const BasicTableWithSearchOnAllFields = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[3]),
};

export const BasicTableWithDate = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[4]),
};

export const BasicTableWithActions = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[5]),
};

export const BasicTableWithActionsAndSelect = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[6]),
};

export const BasicTableWithActionsConfirmAndForm = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[7]),
};

export const BasicTableWithTruncateAndCopy = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[8]),
};

