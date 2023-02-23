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
} from "../../packages/input-date/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(
    args,
    meta.argTypes as any,
    componentSetup.repoName,
    version
  );

export const FormDateInputDefault = Template.bind({});

FormDateInputDefault.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "default") ||
    (undefined as any)
);
export const FormDateInputFrom27Febb2022 = Template.bind({});

FormDateInputFrom27Febb2022.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "from27Febb2022") ||
    (undefined as any)
);
