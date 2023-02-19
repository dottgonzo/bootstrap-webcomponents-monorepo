import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "./utils/webComponentUtils";
import { storybookArgs, componentSetup } from "../../packages/form/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes as any, componentSetup.repoName);

export const BasicFormHost = Template.bind({});
BasicFormHost.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "BasicFormHost")
);
export const FormHostWithFileTemplate = Template.bind({});

FormHostWithFileTemplate.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "FormHostWithFileTemplate")
);
export const FormHostTemplateCompiled = Template.bind({});
FormHostTemplateCompiled.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "FormHostTemplateCompiled")
);
export const FormHostTemplateConditional = Template.bind({});
FormHostTemplateConditional.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "FormHostTemplateConditional")
);
