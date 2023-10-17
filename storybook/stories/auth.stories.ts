
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
  title: "components/Auth",
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

export const login = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const register = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const activate = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

export const recover = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[3]),
};

export const LoginEn = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[4]),
};

export const LoginItOnly = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[5]),
};

export const LoginEnWithFetch = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[6]),
};

export const LoginEnWithOauth = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[7]),
};

export const LoginEnWithOauthOnly = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[8]),
};

export const forgotpassword = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[9]),
};

export const mailrecoverinfo = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[10]),
};

