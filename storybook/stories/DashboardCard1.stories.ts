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
} from "../../packages/dashboard-card1/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "Site/DashboardCard1",
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

export const DashboardCard1Template = {
  args: {
    id: "DashboardCard1Template",
    header: {
      label: "label",
      icon: "window",
      badge: "badge",
    },
    _testInnerHtml:
      '<div style="background-color:red" slot="content">cooontent</div>',
  },
};
export const DashboardCard1TemplateNoBorder = {
  args: {
    id: "DashboardCard1TemplateNoBorder",
    header: {
      label: "no border",
      icon: "window",
      badge: "badge2",
    },
    body: { noborder: true },
    _testInnerHtml:
      '<div style="background-color:red" slot="content">cooontent</div>',
  },
};
// export const DashboardCard1TemplateWithPlaceholder={args:{
//   id: "DashboardCard1TemplateWithPlaceholder",
//   header: {
//     label: "label",
//     icon: "window",
//     badge: "badge",
//   },
//   placeholder: { type: "text", content: "placeholder" },
// };
