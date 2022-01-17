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
    pointClickCoordinates: { action: "pointClickCoordinates" },
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
  options: { centerFromGeometries: true },
  data: [
    {
      marker: {
        lngLat: [10.1, 10],
        icon: {
          uri: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Visual_Studio_Code_Insiders_1.36_icon.svg",
          scale: 0.15,
          anchor: [0.5, 0.1],
        },
      },
    },
    {
      marker: {
        lngLat: [10, 10],
      },
    },
    {
      marker: {
        lngLat: [10.3, 10],
      },
    },
  ],
};

export const MapTemplate2 = Template.bind({});
MapTemplate2.args = {
  id: "MapTemplate2",
  center: [15.0819224, 37.5176038],
  zoom: 16,
  source: { type: "osm" },
  data: [
    {
      marker: {
        lngLat: [15.0819224, 37.5176038],
      },
    },
  ],
};
