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
} from "../../packages/contact-item/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "Components/Contact",
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

export const ContactPhone = {
  args: {
    id: "ContactPhone",
    phone: { number: 465564 },
  },
};
export const ContactEmail = {
  args: {
    id: "ContactEmail",
    email: { address: "dev@dariocaruso.info" },
  },
};
export const ContactSite = {
  args: {
    id: "ContactSite",
    site: {
      uri: "https://dariocaruso.info",
      label: "dariocaruso.info",
      open: true,
    },
  },
};
export const ContactAddressgs = {
  args: {
    id: "ContactAddress",
    address: { address: "egeg" },
  },
};
