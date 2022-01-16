import { Story, Meta } from "@storybook/html";
import { webComponentBind } from "./utils/webComponentUtils";

const meta: Meta = {
  title: "Map/Map",
  argTypes: {
    id: { control: { disable: true } },
    options: { control: { type: "object" } },
    center: { control: { type: "array" } },
    data: { control: { type: "array" } },
    zoom: { control: { type: "number" } },
    source: { control: { type: "object" } },
  },
};

export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, "map", { style: { height: "400px" } });

export const MapTemplate = Template.bind({});
MapTemplate.args = {
  id: "MapTemplate",
  center: [10, 10],
  zoom: 9,
  source: { type: "osm" },
  data: [
    {
      marker: {
        latLng: [10.1, 10],
      },
    },
    {
      marker: {
        latLng: [10.2, 10],
      },
    },
    {
      marker: {
        latLng: [10.3, 10],
      },
    },
  ],
};
