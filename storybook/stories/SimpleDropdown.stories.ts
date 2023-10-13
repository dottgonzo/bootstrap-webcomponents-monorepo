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
} from "../../packages/dropdown-simple/extra/docs";

const usermenu1 = {
  list: [
    {
      key: "list1",
      label: "list1",
    },
    {
      key: "list2",
      label: "list2",
    },
    {
      key: "list3",
      label: "list3",
      group: "list1",
      badge: "3",
    },
    {
      key: "list4",
      label: "list4",
      badge: "555",
    },
  ],
  imgUri:
    "https://upload.wikimedia.org/wikipedia/commons/8/80/Wikipedia-logo-v2.svg",
};

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "Layout/DropdownSimple",
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

export const BasicSimpleDropdown = {
  args: {
    id: "BasicSimpleDropdown",
    list: [
      {
        key: "ciao",
        label: "bao",
      },
      {
        key: "ciao2",
        label: "bao2",
      },
      {
        key: "ciao3",
        label: "bao3",
        linkHref: "fefeef",
      },
    ],
  },
};

export const BasicSimpleDropdownRight = {
  args: {
    id: "BasicSimpleDropdownRight",
    list: [
      {
        key: "ciao",
        label: "bao",
      },
      {
        key: "ciao2",
        label: "bao2",
      },
      {
        key: "ciao3",
        label: "bao3",
        linkHref: "fefeef",
      },
    ],
  },
};
