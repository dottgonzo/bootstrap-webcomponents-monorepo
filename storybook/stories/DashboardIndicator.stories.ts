import { Story, Meta } from "@storybook/html";
import {
  webComponentBind,
  argTypesExtraUtils,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/dashboard-indicator/extra/docs";
const copy1 = Object.assign({}, argTypesExtraUtils);
const copy2 = Object.assign({}, storybookArgs);

const assigned = Object.assign({}, copy1, copy2);
const meta: Meta = {
  title: componentSetup.category + "/Indicator",
  argTypes: assigned,
};
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, componentSetup.name);

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
