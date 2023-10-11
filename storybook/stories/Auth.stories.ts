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

export const Login = setStorybookData(
  componentSetup.name,
  componentSetup.examples[0]
);

export const Register = setStorybookData(
  componentSetup.name,
  componentSetup.examples[1]
);
export const LoginWithActivation = setStorybookData(
  componentSetup.name,
  componentSetup.examples[2]
);

export const LoginWithRecover = setStorybookData(
  componentSetup.name,
  componentSetup.examples[3]
);

export const LoginEn = setStorybookData(
  componentSetup.name,
  componentSetup.examples[4]
);
export const LoginOnlyItalian = setStorybookData(
  componentSetup.name,
  componentSetup.examples[5]
);
export const LoginEnWithFetch = setStorybookData(
  componentSetup.name,
  componentSetup.examples[6]
);
export const LoginEnWithOauth = setStorybookData(
  componentSetup.name,
  componentSetup.examples[7]
);
export const LoginEnWithOauthOnly = setStorybookData(
  componentSetup.name,
  componentSetup.examples[8]
);

export const ForgetPassword = setStorybookData(
  componentSetup.name,
  componentSetup.examples[9]
);
export const EmailInstructionSide = setStorybookData(
  componentSetup.name,
  componentSetup.examples[10]
);
