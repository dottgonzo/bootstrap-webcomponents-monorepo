import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/input-number/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes as any, componentSetup.repoName);

export const FormTextInputRequired = Template.bind({});

FormTextInputRequired.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[0]
);
export const FormTextInputwithmin = Template.bind({});

FormTextInputwithmin.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[1]
);
export const FormTextInputwithmax = Template.bind({});

FormTextInputwithmax.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[2]
);
export const FormTextInputwithminmax = Template.bind({});

FormTextInputwithminmax.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[3]
);
