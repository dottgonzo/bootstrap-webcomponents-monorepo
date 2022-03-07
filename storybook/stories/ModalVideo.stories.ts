import { Story, Meta } from "@storybook/html";
import {
  webComponentBind,
  argTypesExtraUtils,
} from "./utils/webComponentUtils";
import { storybookArgs } from "../../packages/modal-video/extra/docs";

const meta: Meta = {
  title: "Components/VideoModal",
  argTypes: Object.assign(argTypesExtraUtils, storybookArgs),
};

export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, "modal-video");

export const VideoModalTemplateFill = Template.bind({});
VideoModalTemplateFill.args = {
  id: "BasicVideoModalFill",
  uri: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
};

export const VideoModalTemplate = Template.bind({});
VideoModalTemplate.args = {
  id: "BasicVideoModal",
};
