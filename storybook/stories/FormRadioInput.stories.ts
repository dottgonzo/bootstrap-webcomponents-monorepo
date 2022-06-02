import { Story, Meta } from "@storybook/html";
import {
  webComponentBind,
  argTypesExtraUtils,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/input-radio/extra/docs";

const copy1 = Object.assign({}, argTypesExtraUtils);
const copy2 = Object.assign({}, storybookArgs);

const assigned = Object.assign({}, copy1, copy2);
const meta: Meta = {
  title: componentSetup.category + "/FormRadioInput",
  argTypes: assigned,
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
  webComponentBind(args, meta.argTypes, componentSetup.name);

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
