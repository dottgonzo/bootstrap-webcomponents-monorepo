
import "./main.css";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import type { Meta } from "@storybook/html";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/site-contacts-row/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "site/sitecontactsrow",
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

export const sitecontactsrow0 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const sitecontactsrow1 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const sitecontactsrow2 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

export const sitecontactsrow3 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[3]),
};

export const sitecontactsrow4 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[4]),
};

export const sitecontactsrow5 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[5]),
};

export const sitecontactsrow6 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[6]),
};

export const sitecontactsrow7 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[7]),
};

export const sitecontactsrow8 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[8]),
};

export const sitecontactsrow9 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[9]),
};

export const sitecontactsrow10 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[10]),
};

