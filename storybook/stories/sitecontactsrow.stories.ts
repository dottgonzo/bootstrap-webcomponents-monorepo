
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
  title: "site/Site Contacts Row",
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

export const big = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const small = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const auto = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

export const auto2 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[3]),
};

export const auto3 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[4]),
};

export const auto4 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[5]),
};

export const auto1 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[6]),
};

export const big2 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[7]),
};

export const big3 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[8]),
};

export const big4 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[9]),
};

export const big1 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[10]),
};

