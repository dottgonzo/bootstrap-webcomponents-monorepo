import { Story, Meta } from "@storybook/html";
import {
  webComponentBind,
  argTypesExtraUtils,
} from "./utils/webComponentUtils";
import { storybookArgs } from "../../packages/input-text/extra/docs";

const meta: Meta = {
  title: "Form/FormTextInput",
  argTypes: Object.assign(argTypesExtraUtils, storybookArgs),
};

export default meta;

const inputEntry1 = {
  type: "text",
  placeholder: "Insert your last name here...",
  id: "lastName",
  required: true,
  label: "Last Name",
  validationTip: "This field cannot be empty.",
};

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, "input-text");

export const FormTextInputTemplate = Template.bind({});
FormTextInputTemplate.args = {
  id: "BasicFormTextInput",
  schemaentry: inputEntry1,
};
