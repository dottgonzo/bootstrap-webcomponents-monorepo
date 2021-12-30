import { Story, Meta } from "@storybook/html";
import { createFormFileInput, FormFileInputProps } from "./FormFileInput";
import type { FormSchemaEntry } from "../../packages/formfileinputrenderer/app/types/webcomponent.type";

export default {
  title: "Form/FormFileInput",
  argTypes: {
    id: { control: { disable: true } },
  },
} as Meta;

const inputEntry1: FormSchemaEntry = {
  type: "file",
  placeholder: "Insert your last name here...",
  id: "lastName",
  required: true,
  label: "Last Name",
  validationTip: "This field cannot be empty.",
};

const Template: Story<FormFileInputProps> = (args) => createFormFileInput(args);

export const FormFileInputTemplate = Template.bind({});
FormFileInputTemplate.args = {
  id: "BasicFormFileInput",
  schemaentry: inputEntry1,
};
