import { Story, Meta } from "@storybook/html";
import {
  webComponentBind,
  argTypesExtraUtils,
} from "./utils/webComponentUtils";
// import type { FormSchemaEntry } from "../../packages/formtextinputrenderer/app/types/webcomponent.type";

const meta: Meta = {
  title: "Form/FormTextInput",
  argTypes: {
    id: { control: { disable: true } },
    schemaentry: { control: { type: "object" } },
  },
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
