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
} from "../../packages/site-contacts-row/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "Site/SiteContactsRow",
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

export const SiteContactsBig = setStorybookData(
  componentSetup.name,
  componentSetup.examples[0]
);
export const SiteContactsSmall = setStorybookData(
  componentSetup.name,
  componentSetup.examples[1]
);
export const SiteContacts = setStorybookData(
  componentSetup.name,
  componentSetup.examples[2]
);
export const SiteContactsAuto2 = setStorybookData(
  componentSetup.name,
  componentSetup.examples[3]
);
export const SiteContactsAuto3 = setStorybookData(
  componentSetup.name,
  componentSetup.examples[4]
);
export const SiteContactsAuto4 = setStorybookData(
  componentSetup.name,
  componentSetup.examples[5]
);
export const SiteContactsAuto1 = setStorybookData(
  componentSetup.name,
  componentSetup.examples[6]
);
export const SiteContactsBig2 = setStorybookData(
  componentSetup.name,
  componentSetup.examples[7]
);
export const SiteContactsBig3 = setStorybookData(
  componentSetup.name,
  componentSetup.examples[8]
);
export const SiteContactsBig4 = setStorybookData(
  componentSetup.name,
  componentSetup.examples[9]
);
export const SiteContactsBig1 = setStorybookData(
  componentSetup.name,
  componentSetup.examples[10]
);
