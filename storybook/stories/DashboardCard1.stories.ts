import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import { version } from "../../lerna.json";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/dashboard-card1/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(
    args,
    meta.argTypes as any,
    componentSetup.repoName,
    version
  );

export const DashboardCard1Template = Template.bind({});
DashboardCard1Template.args = {
  id: "DashboardCard1Template",
  header: {
    label: "label",
    icon: "window",
    badge: "badge",
  },
  _testInnerHtml:
    '<div style="background-color:red" slot="content">cooontent</div>',
};
export const DashboardCard1TemplateNoBorder = Template.bind({});
DashboardCard1TemplateNoBorder.args = {
  id: "DashboardCard1TemplateNoBorder",
  header: {
    label: "no border",
    icon: "window",
    badge: "badge2",
  },
  body: { noborder: true },
  _testInnerHtml:
    '<div style="background-color:red" slot="content">cooontent</div>',
};
// export const DashboardCard1TemplateWithPlaceholder = Template.bind({});
// DashboardCard1TemplateWithPlaceholder.args = {
//   id: "DashboardCard1TemplateWithPlaceholder",
//   header: {
//     label: "label",
//     icon: "window",
//     badge: "badge",
//   },
//   placeholder: { type: "text", content: "placeholder" },
// };
