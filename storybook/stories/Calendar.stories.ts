import { Story, Meta } from "@storybook/html";
import { createCalendar, CalendarProps } from "./Calendar";
import type { IEvent } from "../../packages/calendar/app/types/webcomponent.type";
import dayjs from "dayjs";

export default {
  title: "Contents/Calendar",
  argTypes: {
    id: { control: { disable: true } },
    calendarEventClick: { action: "calendarEventClickEvent" },
    changeCalendarDate: { action: "changeCalendarDateEvent" },
  },
} as Meta;

const events: IEvent[] = [
  {
    date: new Date(),
    id: "test",
    label: "thetest",
  },
  {
    date: dayjs().startOf("month").subtract(1, "day").toDate(),
    id: "testend",
    label: "thetest end",
  },
  {
    date: dayjs().startOf("month").subtract(1, "day").toDate(),
    id: "test2",
    label: "thetest start",
  },
];

const Template: Story<CalendarProps> = (args) => createCalendar(args);

export const BasicCalendar = Template.bind({});
BasicCalendar.args = {
  id: "BasicCalendar",
};

export const CalendarWithEvents = Template.bind({});
CalendarWithEvents.args = {
  id: "CalendarWithEvents",
  events,
};
