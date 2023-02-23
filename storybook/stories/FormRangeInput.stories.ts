import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import lernaPkg from "../../lerna.json";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/input-range/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(
    args,
    meta.argTypes as any,
    componentSetup.repoName,
    lernaPkg.version
  );

export const FormRangeInputRequired = Template.bind({});

FormRangeInputRequired.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "required") ||
    (undefined as any)
);
export const FormRangeInputwithmin = Template.bind({});

FormRangeInputwithmin.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "withmax") ||
    (undefined as any)
);
export const FormRangeInputwithmax = Template.bind({});

FormRangeInputwithmax.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "withmin") ||
    (undefined as any)
);
export const FormRangeInputwithminmax = Template.bind({});

FormRangeInputwithminmax.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "withminmax") ||
    (undefined as any)
);
