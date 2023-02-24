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
} from "../../packages/input-array-objects/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(
    args,
    meta.argTypes as any,
    componentSetup.repoName,
    lernaPkg.version
  );

export const FormArrayObjectsInputTemplate = Template.bind({});

FormArrayObjectsInputTemplate.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "default") ||
    (undefined as any)
);
export const FormArrayObjectsInputTemplateRequired = Template.bind({});

FormArrayObjectsInputTemplateRequired.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "defaultRequired") ||
    (undefined as any)
);
export const FormArrayObjectsInputTemplateRequiredWithMin = Template.bind({});

FormArrayObjectsInputTemplateRequiredWithMin.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "requiredwithmin") ||
    (undefined as any)
);
export const FormArrayObjectsInputTemplateRequiredWithMax = Template.bind({});

FormArrayObjectsInputTemplateRequiredWithMax.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "requiredwithmax") ||
    (undefined as any)
);
export const FormArrayObjectsInputTemplateRequiredWithMaxMin = Template.bind(
  {}
);

FormArrayObjectsInputTemplateRequiredWithMaxMin.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "requiredwithminmax") ||
    (undefined as any)
);
