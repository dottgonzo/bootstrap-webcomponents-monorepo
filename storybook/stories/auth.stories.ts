
import "./main.css";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import type { Meta } from "@storybook/html";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/auth/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "components/auth",
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

export const auth0 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const auth1 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const auth2 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

export const auth3 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[3]),
};

export const auth4 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[4]),
};

export const auth5 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[5]),
};

export const auth6 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[6]),
};

export const auth7 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[7]),
};

export const auth8 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[8]),
};

export const auth9 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[9]),
};

export const auth10 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[10]),
};

