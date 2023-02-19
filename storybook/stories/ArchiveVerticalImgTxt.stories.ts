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
} from "../../packages/vertical-img-txt-archive/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(
    args,
    meta.argTypes as any,
    componentSetup.repoName,
    version
  );

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
export const ArchiveVerticalImgTxtFixed = Template.bind({});
ArchiveVerticalImgTxtFixed.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[2]
);
