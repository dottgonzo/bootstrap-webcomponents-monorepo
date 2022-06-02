import type { Story } from "@storybook/html";
import { webComponentBind, getStorybookMeta } from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/input-file/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
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
  webComponentBind(args, meta.argTypes, componentSetup.name);

export const FormFileInputTemplate = Template.bind({});
FormFileInputTemplate.args = {
  id: "BasicFormFileInput",
  schemaentry: inputEntry1,
};
