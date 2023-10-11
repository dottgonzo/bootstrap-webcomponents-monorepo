import "./main.css";
import type { Meta } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/table/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "Table/Table",
  tags: ["autodocs"],

  parameters: meta.parameters,

  argTypes: meta.argTypes,
  render: ({ label, ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    // @ts-ignore
    return webComponentBind(
      args,
      meta.argTypes,
      componentSetup.repoName,
      lernaPkg.version
    );
  },
};

export const BasicTable = setStorybookData(
  componentSetup.name,
  componentSetup.examples[0]
);
export const BasicTableWithClick = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "BasicTableWithClick") ||
    (undefined as any)
);
export const BasicTableWithMoreSearchAndSelect = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find(
    (f) => f.name === "BasicTableWithMoreSearchAndSelect"
  ) || (undefined as any)
);
export const BasicTableWithSearchOnNestedField = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find(
    (f) => f.name === "BasicTableWithSearchOnNestedField"
  ) || (undefined as any)
);
export const BasicTableWithSearchOnAllFields = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find(
    (f) => f.name === "BasicTableWithSearchOnAllFields"
  ) || (undefined as any)
);
export const BasicTableWithDate =
  setStorybookData(
    componentSetup.name,
    componentSetup.examples.find((f) => f.name === "BasicTableWithDate") ||
      (undefined as any)
  ) || (undefined as any);
export const BasicTableWithActions = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "BasicTableWithActions") ||
    (undefined as any)
);
export const BasicTableWithActionsAndSelect = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find(
    (f) => f.name === "BasicTableWithActionsAndSelect"
  ) || (undefined as any)
);
export const BasicTableWithActionsConfirmAndForm = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find(
    (f) => f.name === "BasicTableWithActionsConfirmAndForm"
  ) || (undefined as any)
);

export const BasicTableWithTruncateAndCopy = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find(
    (f) => f.name === "BasicTableWithTruncateAndCopy"
  ) || (undefined as any)
);
