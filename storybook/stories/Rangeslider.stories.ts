import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/range-slider/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes as any, componentSetup.name);

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
