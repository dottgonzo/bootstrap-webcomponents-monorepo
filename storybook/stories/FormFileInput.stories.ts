import { Story, Meta } from "@storybook/html";
import {
  webComponentBind,
  argTypesExtraUtils,
} from "./utils/webComponentUtils";
// import type { FormSchemaEntry } from "../../packages/formfileinputrenderer/app/types/webcomponent.type";

const meta: Meta = {
  title: "Form/FormFileInput",
  argTypes: {
    id: { control: { disable: true } },
    schemaentry: { control: { type: "object" } },
  },
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
