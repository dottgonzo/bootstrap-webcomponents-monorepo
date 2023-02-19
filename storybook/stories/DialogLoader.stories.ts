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
} from "../../packages/dialog-loader/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(
    args,
    meta.argTypes as any,
    componentSetup.repoName,
    version
  );

export const UploaderTemplate = Template.bind({});
UploaderTemplate.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[0]
);
export const UploaderEmpty = Template.bind({});
UploaderEmpty.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[1]
);
