import { Story, Meta } from "@storybook/html";
import { webComponentBind } from "./utils/webComponentUtils";
// import type { FormSchemaEntry } from "../../packages/formtextinputrenderer/app/types/webcomponent.type";

const meta: Meta = {
  title: "Form/FormRadioInput",
  argTypes: {
    id: { control: { disable: true } },
    schemaentry: { control: { type: "object" } },
  },
};

export default meta;

const inputEntry1 = {
  type: "radio",
  placeholder: "Choose here...",
  id: "check0",
  required: true,
  label: "Check 0",
  validationTip: "Check 1",
  group: "ciao",
};

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, "input-radio");

export const FormRadioInputTemplate = Template.bind({});
FormRadioInputTemplate.args = {
  id: "FormRadioInputTemplate",
  schemaentry: inputEntry1,
};
