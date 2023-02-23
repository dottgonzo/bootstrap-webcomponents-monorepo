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
} from "../../packages/input-area/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(
    args,
    meta.argTypes as any,
    componentSetup.repoName,
    lernaPkg.version
  );

export const FormAreaTemplate = Template.bind({});
FormAreaTemplate.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[0]
);
export const FormAreaTemplateTequired = Template.bind({});
FormAreaTemplateTequired.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[1]
);
