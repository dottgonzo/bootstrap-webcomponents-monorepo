import { Story, Meta } from "@storybook/html";
import { webComponentBind } from "./webComponentUtils";
// import type { IEvent } from "../../packages/calendar/app/types/webcomponent.type";
import dayjs from "dayjs";
const meta: Meta = {
  title: "Contents/Calendar",
  argTypes: {
    id: { control: { disable: true } },
    events: { control: { type: "object" } },
    calendarEventClick: { action: "calendarEventClickEvent" },
    changeCalendarDate: { action: "changeCalendarDateEvent" },
    changeSelectedDate: { action: "changeSelectedDateEvent" },
  },
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
