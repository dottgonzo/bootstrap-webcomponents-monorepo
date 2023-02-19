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
} from "../../packages/modal-video/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(
    args,
    meta.argTypes as any,
    componentSetup.repoName,
    version
  );

export const VideoModalTemplateFill = Template.bind({});
VideoModalTemplateFill.args = {
  id: "BasicVideoModalFill",
  uri: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
};

export const VideoModalTemplate = Template.bind({});
VideoModalTemplate.args = {
  id: "BasicVideoModal",
};
