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
} from "../../packages/input-file/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(
    args,
    meta.argTypes as any,
    componentSetup.repoName,
    lernaPkg.version
  );

export const FormFileInputTemplate = Template.bind({});
FormFileInputTemplate.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "default") ||
    (undefined as any)
);
export const FormFileInputImage = Template.bind({});
FormFileInputImage.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "image") || (undefined as any)
);
