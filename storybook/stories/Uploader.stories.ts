import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/uploader/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes as any, componentSetup.name);

export const UploaderTemplate = Template.bind({});
UploaderTemplate.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[0]
);
export const EmptyData = Template.bind({});
EmptyData.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[1]
);
