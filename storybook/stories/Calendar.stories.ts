import { Story, Meta } from "@storybook/html";
import {
  webComponentBind,
  argTypesExtraUtils,
} from "./utils/webComponentUtils";
import { storybookArgs } from "../../packages/calendar-events/extra/docs";
import dayjs from "dayjs";
const meta: Meta = {
  title: "Contents/Calendar",
  argTypes: Object.assign(argTypesExtraUtils, storybookArgs),
};
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
  webComponentBind(args, meta.argTypes, "calendar-events");

export const BasicCalendar = Template.bind({});
BasicCalendar.args = {
  id: "BasicCalendar",
};

export const CalendarWithEvents = Template.bind({});
CalendarWithEvents.args = {
  id: "CalendarWithEvents",
  events,
};
