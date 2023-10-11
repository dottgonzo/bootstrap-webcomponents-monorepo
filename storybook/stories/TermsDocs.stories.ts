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
} from "../../packages/terms-doc-templates/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "Site/TermsDocs",
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

export const PrivacyDocItalian1 = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "italian") ||
    (undefined as any)
);

export const CookieDocItalian1 = setStorybookData(
  componentSetup.name,
  componentSetup.examples[1]
);
export const CookieDocEn1 = setStorybookData(
  componentSetup.name,
  componentSetup.examples[2]
);
export const CookieDocEnEmpty = setStorybookData(
  componentSetup.name,
  componentSetup.examples[3]
);
