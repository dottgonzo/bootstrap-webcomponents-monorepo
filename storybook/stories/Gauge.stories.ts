import { Story, Meta } from "@storybook/html";
import {
  webComponentBind,
  argTypesExtraUtils,
} from "./utils/webComponentUtils";
import { storybookArgs } from "../../packages/gauge/extra/docs";

const meta: Meta = {
  title: "Charts/Gauges",
  argTypes: Object.assign(argTypesExtraUtils, storybookArgs),
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
