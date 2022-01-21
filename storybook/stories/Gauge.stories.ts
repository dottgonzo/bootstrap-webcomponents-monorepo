import { Story, Meta } from "@storybook/html";
import { webComponentBind } from "./utils/webComponentUtils";

const meta: Meta = {
  title: "Charts/Gauges",
  argTypes: {
    id: { control: { disable: true } },
    options: { control: { type: "object" } },
  },
};

export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, "gauge");

export const GaugesTemplate = Template.bind({});
GaugesTemplate.args = {
  id: "GaugesTemplate",
  options: {
    value: 50,
    min: 0,
    max: 100,
  },
};
