import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import { version } from "../../lerna.json";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/range-slider/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(
    args,
    meta.argTypes as any,
    componentSetup.repoName,
    version
  );

export const BasicRangeslider = Template.bind({});
BasicRangeslider.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "default") ||
    (undefined as any)
);

export const BasicRangesliderWithBubbles = Template.bind({});
BasicRangesliderWithBubbles.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "withBubbles") || (undefined as any)
);
export const BasicRangesliderWithValues = Template.bind({});
BasicRangesliderWithValues.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "withValues") ||
    (undefined as any)
);
export const BasicRangesliderWithPositionValue = Template.bind({});
BasicRangesliderWithPositionValue.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "withPositionValue") ||
    (undefined as any)
);
