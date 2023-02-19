import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/input-datetime/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes as any, componentSetup.repoName);

export const FormTextDateTimeTemplate_empty = Template.bind({});

FormTextDateTimeTemplate_empty.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "empty")
);
export const FormTextDateTimeTemplate_emptyRequired = Template.bind({});

FormTextDateTimeTemplate_emptyRequired.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "emptyRequired")
);
export const FormTextDateTimeTemplate_withValue = Template.bind({});

FormTextDateTimeTemplate_withValue.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "withValue")
);
