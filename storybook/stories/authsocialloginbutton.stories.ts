
import "./main.css";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import type { Meta } from "@storybook/html";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/auth-social-login-button/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "components/Auth Social Login Button",
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

export const facebook = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const gitlab = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const github = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

export const google = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[3]),
};

