import "./main.css";
import type { Meta } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import lernaPkg from "../../lerna.json";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/input-datetime/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "Form/DatetimeInput",
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

export const FormTextDateTimeTemplate_empty = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "empty") || (undefined as any)
);
export const FormTextDateTimeTemplate_emptyRequired = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "emptyRequired") ||
    (undefined as any)
);
export const FormTextDateTimeTemplate_withValue = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "withValue") ||
    (undefined as any)
);

export const FormTextDateTimeTemplate_maxDate27Feb2023 = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "maxDate27Feb2023") ||
    (undefined as any)
);

export const FormTextDateTimeTemplate_minDate27Feb2023 = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "minDate27Feb2023") ||
    (undefined as any)
);

export const FormTextDateTimeTemplate_rangeDate27Feb2023 = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "rangeDate27Feb2023") ||
    (undefined as any)
);
