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
} from "../../packages/cookie-law-banner/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "Components/CookieLawBanner",
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

export const CookielawSimple = {
  args: {
    id: "CookielawSimple",
  },
};
export const CookielawWithDecline = {
  args: {
    id: "CookielawWithDecline",
    allowdecline: true,
  },
};
export const CookielawEn = {
  args: {
    id: "CookielawEn",
    i18nlang: "en",
  },
};
export const CookielawIt = {
  args: {
    id: "CookielawIt",
    i18nlang: "it",
  },
};
