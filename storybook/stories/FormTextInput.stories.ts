import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import lernaPkg from "../../lerna.json";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/input-text/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(
    args,
    meta.argTypes as any,
    componentSetup.repoName,
    lernaPkg.version
  );

export const FormTextInputTemplate = Template.bind({});

FormTextInputTemplate.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "default") ||
    (undefined as any)
);
export const FormTextInputTemplateRequired = Template.bind({});

FormTextInputTemplateRequired.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "defaultRequired") ||
    (undefined as any)
);
export const FormTextInputTemplateRequiredWithMin = Template.bind({});

FormTextInputTemplateRequiredWithMin.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "requiredwithmin") ||
    (undefined as any)
);
export const FormTextInputTemplateRequiredWithMax = Template.bind({});

FormTextInputTemplateRequiredWithMax.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "requiredwithmax") ||
    (undefined as any)
);
export const FormTextInputTemplateRequiredWithMaxMin = Template.bind({});

FormTextInputTemplateRequiredWithMaxMin.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "requiredwithminmax") ||
    (undefined as any)
);
export const FormTextInputTemplateRequiredWithRegex = Template.bind({});

FormTextInputTemplateRequiredWithRegex.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "requiredwithregex") ||
    (undefined as any)
);
