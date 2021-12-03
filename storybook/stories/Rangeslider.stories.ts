import { Story, Meta } from "@storybook/html";
import { createRangeslider, RangesliderProps } from "./Rangeslider";

export default {
  title: "Components/Rangeslider",
  argTypes: {
    id: { control: { disable: true } },
  },
} as Meta;

const Template: Story<RangesliderProps> = (args) => createRangeslider(args);

export const BasicRangeslider = Template.bind({});
BasicRangeslider.args = {
  id: "BasicRangeslider",
};
export const BasicRangesliderWithBubbles = Template.bind({});
BasicRangesliderWithBubbles.args = {
  id: "BasicRangesliderWithBubbles",
  withbubbles: true,
};
