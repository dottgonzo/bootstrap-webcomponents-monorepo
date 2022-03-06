import { Story, Meta } from "@storybook/html";
import {
  webComponentBind,
  argTypesExtraUtils,
} from "./utils/webComponentUtils";
import { storybookArgs } from "../../packages/input-file/extra/docs";

const meta: Meta = {
  title: "Form/FormFileInput",
  argTypes: Object.assign(argTypesExtraUtils, storybookArgs),
};

export default meta;

const inputEntry1 = {
  type: "file",
  placeholder: "Insert your last name here...",
  id: "lastName",
  required: true,
  label: "Last Name",
  validationTip: "This field cannot be empty.",
};

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, "input-file");

export const FormFileInputTemplate = Template.bind({});
FormFileInputTemplate.args = {
  id: "BasicFormFileInput",
  schemaentry: inputEntry1,
};
