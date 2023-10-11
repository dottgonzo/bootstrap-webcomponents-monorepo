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
} from "../../packages/range-slider/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "Components/Rangeslider",
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

export const BasicRangeslider = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "default") ||
    (undefined as any)
);

export const BasicRangesliderWithBubbles = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "withBubbles") ||
    (undefined as any)
);
export const BasicRangesliderWithValues = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "withValues") ||
    (undefined as any)
);
export const BasicRangesliderWithPositionValue = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "withPositionValue") ||
    (undefined as any)
);
