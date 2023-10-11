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
} from "../../packages/dashboard-counter-lines/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "Components/DashboardCounterLines",
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

export const DashboardCounterLinesSimple = setStorybookData(
  componentSetup.name,
  componentSetup.examples[0]
);
export const DashboardCounterLinesWithNewTab = setStorybookData(
  componentSetup.name,
  componentSetup.examples[1]
);
export const DashboardCounterLinesWithLink = setStorybookData(
  componentSetup.name,
  componentSetup.examples[2]
);
export const DashboardCounterLinesWithEvent = setStorybookData(
  componentSetup.name,
  componentSetup.examples[3]
);
