import { Story, Meta } from "@storybook/html";
import {
  webComponentBind,
  argTypesExtraUtils,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/input-text/extra/docs";

const copy1 = Object.assign({}, argTypesExtraUtils);
const copy2 = Object.assign({}, storybookArgs);

const assigned = Object.assign({}, copy1, copy2);
const meta: Meta = {
  title: componentSetup.category + "/FormColorInput",
  argTypes: assigned,
};

export default meta;

const inputEntry1 = {
  placeholder: "Insert color...",
  id: "color1",
  required: true,
  label: "Last color",
  validationTip: "This field cannot be empty.",
  value: "#ffffff",
};

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, componentSetup.name);

export const FormColorInputTemplate = Template.bind({});
FormColorInputTemplate.args = {
  id: "BasicFormColorInput",
  schemaentry: inputEntry1,
};
