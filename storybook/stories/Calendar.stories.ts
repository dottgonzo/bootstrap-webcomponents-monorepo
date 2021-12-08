import { Story, Meta } from "@storybook/html";
import { createCalendar, CalendarProps } from "./Calendar";

export default {
  title: "Contents/Calendar",
  argTypes: {
    id: { control: { disable: true } },
  },
} as Meta;

const Template: Story<CalendarProps> = (args) => createCalendar(args);

export const BasicCalendar = Template.bind({});
BasicCalendar.args = {
  id: "BasicCalendar",
};
