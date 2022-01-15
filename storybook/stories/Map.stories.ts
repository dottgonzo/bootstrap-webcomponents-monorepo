import { Story, Meta } from "@storybook/html";
import { webComponentBind } from "./utils/webComponentUtils";

const meta: Meta = {
  title: "Map/Map",
  argTypes: {
    id: { control: { disable: true } },
    options: { control: { type: "object" } },
  },
};

export default meta;

const Template: Story = (args) => webComponentBind(args, meta.argTypes, "map");

export const MapTemplate = Template.bind({});
MapTemplate.args = {
  id: "MapTemplate",
  options: {
    value: 50,
    min: 0,
    max: 100,
  },
};
