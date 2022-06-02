import type { Story } from "@storybook/html";
import { webComponentBind, getStorybookMeta } from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/input-checkbox/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const inputEntry1 = {
  type: "checkbox",
  placeholder: "Choose here...",
  id: "check0",
  required: true,
  label: "Check 0",
  validationTip: "Check 1",
};

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, componentSetup.name);

export const FormCheckboxInputTemplate = Template.bind({});
FormCheckboxInputTemplate.args = {
  id: "FormCheckboxInputTemplate",
  schemaentry: inputEntry1,
};
