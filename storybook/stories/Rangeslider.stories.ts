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
BasicRangeslider.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "default")
);

export const BasicRangesliderWithBubbles = Template.bind({});
BasicRangesliderWithBubbles.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "withBubbles")
);
export const BasicRangesliderWithValues = Template.bind({});
BasicRangesliderWithValues.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "withValues")
);
export const BasicRangesliderWithPositionValue = Template.bind({});
BasicRangesliderWithPositionValue.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "withPositionValue")
);
