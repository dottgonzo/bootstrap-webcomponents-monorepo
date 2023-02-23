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
} from "../../packages/input-datetime/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(
    args,
    meta.argTypes as any,
    componentSetup.repoName,
    lernaPkg.version
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

export const FormTextDateTimeTemplate_maxDate27Feb2023 = Template.bind({});

FormTextDateTimeTemplate_maxDate27Feb2023.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "maxDate27Feb2023") ||
    (undefined as any)
);

export const FormTextDateTimeTemplate_minDate27Feb2023 = Template.bind({});

FormTextDateTimeTemplate_minDate27Feb2023.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "minDate27Feb2023") ||
    (undefined as any)
);

export const FormTextDateTimeTemplate_rangeDate27Feb2023 = Template.bind({});

FormTextDateTimeTemplate_rangeDate27Feb2023.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "rangeDate27Feb2023") ||
    (undefined as any)
);
