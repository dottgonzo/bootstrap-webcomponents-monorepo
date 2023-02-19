import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/input-text/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes as any, componentSetup.repoName);

export const FormTextInputTemplate = Template.bind({});

FormTextInputTemplate.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[0]
);
export const FormTextInputTemplateRequired = Template.bind({});

FormTextInputTemplateRequired.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[1]
);
export const FormTextInputTemplateRequiredWithMin = Template.bind({});

FormTextInputTemplateRequiredWithMin.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[2]
);
export const FormTextInputTemplateRequiredWithMax = Template.bind({});

FormTextInputTemplateRequiredWithMax.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[3]
);
export const FormTextInputTemplateRequiredWithMaxMin = Template.bind({});

FormTextInputTemplateRequiredWithMaxMin.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[4]
);
export const FormTextInputTemplateRequiredWithRegex = Template.bind({});

FormTextInputTemplateRequiredWithRegex.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[5]
);
