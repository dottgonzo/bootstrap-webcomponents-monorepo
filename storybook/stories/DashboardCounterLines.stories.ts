import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/dashboard-counter-lines/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes as any, componentSetup.repoName);

export const DashboardCounterLinesSimple = Template.bind({});

DashboardCounterLinesSimple.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[0]
);
export const DashboardCounterLinesWithNewTab = Template.bind({});

DashboardCounterLinesWithNewTab.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[1]
);
export const DashboardCounterLinesWithLink = Template.bind({});

DashboardCounterLinesWithLink.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[2]
);
export const DashboardCounterLinesWithEvent = Template.bind({});

DashboardCounterLinesWithEvent.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[3]
);
