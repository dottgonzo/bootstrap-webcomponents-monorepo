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
} from "../../packages/navbar/extra/docs";

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
  title: "Layout/Navbar",
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

export const BasicNavbar = {
  id: "BasicNavbar",
  companybrandname: "testbrand",
  companylogouri:
    "https://upload.wikimedia.org/wikipedia/commons/8/80/Wikipedia-logo-v2.svg",
};
export const BasicNavbarWithTitle = {
  id: "BasicNavbarWithTitle",
  companybrandname: "testbrand2",
  pagetitle: "pagetest",
};
export const BasicNavbarWithTitleOpen = {
  id: "BasicNavbarWithTitleOpen",
  companybrandname: "testbrand2",
  pagetitle: "pagetest",
  switchopen: true,
};
export const NavbarSlotted = {
  id: "NavbarSlotted",
  companybrandname: "testbrand2",
  pagetitle: "pagetest",
  switchopen: true,
  _testInnerHtml: '<div slot="right-slot">slott</div>',
};
export const NavbarWithUserMenu = {
  id: "NavbarWithUserMenu",
  companybrandname: "testbrand",
  companylogouri:
    "https://upload.wikimedia.org/wikipedia/commons/8/80/Wikipedia-logo-v2.svg",
  usermenu: usermenu1,
};
export const NavbarNoBurger = {
  id: "NavbarNoBurger",
  companybrandname: "testbrand",
  companylogouri:
    "https://upload.wikimedia.org/wikipedia/commons/8/80/Wikipedia-logo-v2.svg",
  usermenu: usermenu1,
  noburger: true,
  _testInnerHtml: '<div slot="right-slot">s</div>',
};
