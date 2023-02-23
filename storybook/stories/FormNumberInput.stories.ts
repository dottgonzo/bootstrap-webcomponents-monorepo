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
} from "../../packages/input-number/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(
    args,
    meta.argTypes as any,
    componentSetup.repoName,
    lernaPkg.version
  );

export const FormNumberInputRequired = Template.bind({});

FormNumberInputRequired.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "required") ||
    (undefined as any)
);
export const FormNumberInputwithmin = Template.bind({});

FormNumberInputwithmin.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "withmax") ||
    (undefined as any)
);
export const FormNumberInputwithmax = Template.bind({});

FormNumberInputwithmax.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "withmin") ||
    (undefined as any)
);
export const FormNumberInputwithminmax = Template.bind({});

FormNumberInputwithminmax.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "withminmax") ||
    (undefined as any)
);
