import { Story, Meta } from "@storybook/html";
import {
  webComponentBind,
  argTypesExtraUtils,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/range-slider/extra/docs";

const copy1 = Object.assign({}, argTypesExtraUtils);
const copy2 = Object.assign({}, storybookArgs);

const assigned = Object.assign({}, copy1, copy2);
const meta: Meta = {
  title: componentSetup.category + "/Rangeslider",
  argTypes: assigned,
};

export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, componentSetup.name);

export const BasicRangeslider = Template.bind({});
BasicRangeslider.args = {
  id: "BasicRangeslider",
};
export const BasicRangesliderWithBubbles = Template.bind({});
BasicRangesliderWithBubbles.args = {
  id: "BasicRangesliderWithBubbles",
  withbubbles: true,
};
export const BasicRangesliderWithValues = Template.bind({});
BasicRangesliderWithValues.args = {
  id: "BasicRangesliderWithValues",
  withbubbles: true,
  minval: 20,
  maxval: 60,
};
