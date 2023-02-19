import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/calendar-events/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes as any, componentSetup.repoName);

export const BasicCalendar = Template.bind({});

BasicCalendar.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[0]
);

export const CalendarWithEvents = Template.bind({});

CalendarWithEvents.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[1]
);
