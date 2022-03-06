import { Story, Meta } from "@storybook/html";
import {
  webComponentBind,
  argTypesExtraUtils,
} from "./utils/webComponentUtils";
import { storybookArgs } from "../../packages/input-checkbox/extra/docs";

const meta: Meta = {
  title: "Form/FormCheckBoxInput",
  argTypes: {
    id: { control: { disable: true } },
    schemaentry: { control: { type: "object" } },
  },
};

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
  webComponentBind(args, meta.argTypes, "input-checkbox");

export const FormCheckboxInputTemplate = Template.bind({});
FormCheckboxInputTemplate.args = {
  id: "FormCheckboxInputTemplate",
  schemaentry: inputEntry1,
};
