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
} from "../../packages/form-composer/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "Input/FormComposer",
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

export const FormComposerDefault = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "default") ||
    (undefined as any)
);

export const FormComposerDebug = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "debug") || (undefined as any)
);
export const FormComposerDebugDefault = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "debug-default") ||
    (undefined as any)
);
