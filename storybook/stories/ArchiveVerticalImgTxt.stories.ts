import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/vertical-img-txt-archive/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes as any, componentSetup.name);

export const ArchiveVerticalImgTxt = Template.bind({});
ArchiveVerticalImgTxt.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[0]
);
export const ArchiveVerticalImgTxt2 = Template.bind({});
ArchiveVerticalImgTxt2.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[1]
);
