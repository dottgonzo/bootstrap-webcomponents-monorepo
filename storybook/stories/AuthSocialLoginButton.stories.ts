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
} from "../../packages/auth-social-login-button/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "Auth/SocialLoginButton",
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

export const LoginFacebook = setStorybookData(
  componentSetup.name,
  componentSetup.examples[0]
);

export const LoginGitlab = setStorybookData(
  componentSetup.name,
  componentSetup.examples[1]
);

export const LoginGithub = setStorybookData(
  componentSetup.name,
  componentSetup.examples[2]
);

export const LoginGoogle = setStorybookData(
  componentSetup.name,
  componentSetup.examples[3]
);
