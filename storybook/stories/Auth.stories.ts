import "./main.css";
import type { Meta } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/auth/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "Auth/Auth",
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

export const Login = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const Register = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};
export const LoginWithActivation = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

export const LoginWithRecover = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[3]),
};

export const LoginEn = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[4]),
};
export const LoginOnlyItalian = {
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

export const ForgetPassword = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[9]),
};
export const EmailInstructionSide = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[10]),
};
