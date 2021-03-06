import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/site-slideshow-horizontal/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes as any, componentSetup.name);

export const SiteSlideshowH1 = Template.bind({});

SiteSlideshowH1.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[0]
);
export const SiteSlideshowHVideos = Template.bind({});

SiteSlideshowHVideos.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[1]
);
