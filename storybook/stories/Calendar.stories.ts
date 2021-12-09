import { Story, Meta } from "@storybook/html";
import { createCalendar, CalendarProps } from "./Calendar";
import type { IEvent } from "../../packages/calendar/app/types/webcomponent.type";

export default {
  title: "Contents/Calendar",
  argTypes: {
    id: { control: { disable: true } },
    calendarEventClick: { action: "calendarEventClickEvent" },
  },
} as Meta;

const events: IEvent[] = [
  {
    date: new Date(),
    id: "test",
    label: "thetest",
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
