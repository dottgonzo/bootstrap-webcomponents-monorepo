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
} from "../../packages/stylus-paper/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "Editor/StylusPaper",
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

export const Main = setStorybookData(
  componentSetup.name,
  componentSetup.examples[0]
);

export const WithPressure = setStorybookData(
  componentSetup.name,
  componentSetup.examples[1]
);

export const WithSimulatePressure = setStorybookData(
  componentSetup.name,
  componentSetup.examples[2]
);

export const WithThinBrush = setStorybookData(
  componentSetup.name,
  componentSetup.examples[3]
);

export const WithBigBrush = setStorybookData(
  componentSetup.name,
  componentSetup.examples[4]
);

export const LoadDraw = setStorybookData(
  componentSetup.name,
  componentSetup.examples[5]
);

export const LoadImage = setStorybookData(
  componentSetup.name,
  componentSetup.examples[6]
);

export const LoadText = setStorybookData(
  componentSetup.name,
  componentSetup.examples[7]
);
