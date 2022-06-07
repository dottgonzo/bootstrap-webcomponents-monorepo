import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/form-contact/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, componentSetup.name);

export const FormContact1 = Template.bind({});

FormContact1.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[0]
);
export const FormContact2 = Template.bind({});

FormContact2.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[1]
);
export const FormContact3 = Template.bind({});

FormContact3.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[2]
);
export const FormContactWithCaptcha = Template.bind({});

FormContactWithCaptcha.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[3]
);
