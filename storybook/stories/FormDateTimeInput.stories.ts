import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import { version } from "../../lerna.json";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/input-datetime/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(
    args,
    meta.argTypes as any,
    componentSetup.repoName,
    version
  );

export const FormTextDateTimeTemplate_empty = Template.bind({});

FormTextDateTimeTemplate_empty.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "empty") || (undefined as any)
);
export const FormTextDateTimeTemplate_emptyRequired = Template.bind({});

FormTextDateTimeTemplate_emptyRequired.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "emptyRequired") ||
    (undefined as any)
);
export const FormTextDateTimeTemplate_withValue = Template.bind({});

FormTextDateTimeTemplate_withValue.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "withValue") ||
    (undefined as any)
);
