import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/dashboard-indicator/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes as any, componentSetup.repoName);

export const DashboardIndicator = Template.bind({});
DashboardIndicator.args = {
  id: "DashboardIndicator",
};
export const DashboardIndicatorFull = Template.bind({});
DashboardIndicatorFull.args = {
  id: "DashboardIndicatorFull",
  number: 10,
  label: "ritestamento",
  icon: "window",
  link_label: "testaggio",
};
