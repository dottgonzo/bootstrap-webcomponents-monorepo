import { Story, Meta } from "@storybook/html";
import {
  webComponentBind,
  argTypesExtraUtils,
} from "./utils/webComponentUtils";
import { storybookArgs } from "../../packages/input-radio/extra/docs";

const meta: Meta = {
  title: "Form/FormRadioInput",
  argTypes: {
    id: { control: { disable: true } },
    schemaentry: { control: { type: "object" } },
    showvalidation: { control: { type: "boolean" } },
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
  params: {
    options: [
      { label: "777", value: "555" },
      { label: "testlabel", value: "testvalue" },
    ],
  },
};
const inputEntry2 = {
  type: "radio",
  placeholder: "Choose here...",
  id: "check0",
  required: true,
  label: "Check 0",
  validationTip: "Check 1",
  group: "ciao",
  params: {
    options: [
      { label: "ee", value: "aaa" },
      { label: "testlabel", value: "testvalue" },
    ],
  },
  value: "testvalue",
};
const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, "input-radio");

export const FormRadioInputTemplate = Template.bind({});
FormRadioInputTemplate.args = {
  id: "FormRadioInputTemplate",
  schemaentry: inputEntry1,
};

export const FormRadioInputTemplate2 = Template.bind({});
FormRadioInputTemplate2.args = {
  id: "FormRadioInputTemplate2",
  schemaentry: inputEntry2,
  showvalidation: true,
};
