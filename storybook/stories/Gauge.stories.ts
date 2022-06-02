import { Story, Meta } from "@storybook/html";
import {
  webComponentBind,
  argTypesExtraUtils,
} from "./utils/webComponentUtils";
import { storybookArgs, componentSetup } from "../../packages/gauge/extra/docs";

const copy1 = Object.assign({}, argTypesExtraUtils);
const copy2 = Object.assign({}, storybookArgs);

const assigned = Object.assign({}, copy1, copy2);
const meta: Meta = {
  title: componentSetup.category + "/Gauges",
  argTypes: assigned,
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
