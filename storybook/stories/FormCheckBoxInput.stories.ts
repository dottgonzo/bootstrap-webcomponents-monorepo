import { Story, Meta } from "@storybook/html";
import {
  webComponentBind,
  argTypesExtraUtils,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/input-checkbox/extra/docs";

const copy1 = Object.assign({}, argTypesExtraUtils);
const copy2 = Object.assign({}, storybookArgs);

const assigned = Object.assign({}, copy1, copy2);
const meta: Meta = {
  title: componentSetup.category + "/FormCheckBoxInput",
  argTypes: assigned,
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
