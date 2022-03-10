import { Story, Meta } from "@storybook/html";
import {
  webComponentBind,
  argTypesExtraUtils,
} from "./utils/webComponentUtils";
import { storybookArgs } from "../../packages/calendar-events/extra/docs";
import dayjs from "dayjs";
const copy1 = Object.assign({}, argTypesExtraUtils);
const copy2 = Object.assign({}, storybookArgs);

const assigned = Object.assign({}, copy1, copy2);
const meta: Meta = {
  title: "Contents/Calendar",
  argTypes: assigned,
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
