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
} from "../../packages/vertical-img-txt-archive/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "Components/Archive",
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

export const ArchiveVerticalImgTxt = setStorybookData(
  componentSetup.name,
  componentSetup.examples[0]
);
export const ArchiveVerticalImgTxt2 = setStorybookData(
  componentSetup.name,
  componentSetup.examples[1]
);
export const ArchiveVerticalImgTxtFixed = setStorybookData(
  componentSetup.name,
  componentSetup.examples[2]
);
