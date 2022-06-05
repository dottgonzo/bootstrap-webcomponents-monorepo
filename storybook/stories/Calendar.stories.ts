import type { Story } from "@storybook/html";
import { webComponentBind, getStorybookMeta } from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/calendar-events/extra/docs";
import dayjs from "dayjs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const events = [
  {
    date: new Date(),
    id: "test",
    label: "thetest",
  },
  {
    date: dayjs().startOf("month").subtract(1, "day").toDate(),
    id: "test2",
    label: "thetest start",
  },
];

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, componentSetup.name);

export const BasicCalendar = Template.bind({});

BasicCalendar.args = Object.assign(
  {
    id: "BasicCalendar",
  },
  componentSetup.examples[0].data
);

export const CalendarWithEvents = Template.bind({});

CalendarWithEvents.args = Object.assign(
  {
    id: "CalendarWithEvents",
  },
  componentSetup.examples[1].data
);
