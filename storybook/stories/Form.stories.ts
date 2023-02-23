import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/form/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(
    args,
    meta.argTypes as any,
    componentSetup.repoName,
    lernaPkg.version
  );

export const BasicFormHost = Template.bind({});
BasicFormHost.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "BasicFormHost") ||
    (undefined as any)
);
export const FormHostWithFileTemplate = Template.bind({});

FormHostWithFileTemplate.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "FormHostWithFileTemplate") ||
    (undefined as any)
);
export const FormHostTemplateCompiled = Template.bind({});
FormHostTemplateCompiled.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "FormHostTemplateCompiled") ||
    (undefined as any)
);
export const FormHostTemplateConditional = Template.bind({});
FormHostTemplateConditional.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find(
    (f) => f.name === "FormHostTemplateConditional"
  ) || (undefined as any)
);
export const FormHostTemplateConditionalAndColumns = Template.bind({});
FormHostTemplateConditionalAndColumns.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find(
    (f) => f.name === "FormHostTemplateConditionalAndColumns"
  ) || (undefined as any)
);
