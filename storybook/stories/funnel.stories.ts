
import "./main.css";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import type { Meta } from "@storybook/html";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/funnel/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "form/Funnel",
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

export const BasicFunnelTemplate = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const BasicFunnelTemplateWith2StepsSchema = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const BasicFunnelTemplateWith3StepsSchema = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

export const BasicFunnelTemplateWith4StepsSchema = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[3]),
};

