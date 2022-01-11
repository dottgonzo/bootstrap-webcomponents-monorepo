import { Story, Meta } from "@storybook/html";
import { createVideoModal, VideoModalProps } from "./VideoModal";

const meta = {
  title: "Components/VideoModal",
  argTypes: {
    id: { control: { disable: true } },
    uri: { control: { type: "text" } },
    title: { control: { type: "text" } },
    item: { control: { type: "text" } },
  },
};

export default meta;

const Template: Story<VideoModalProps> = (args) => createVideoModal(args);

export const VideoModalTemplateFill = Template.bind({});
VideoModalTemplateFill.args = {
  id: "BasicVideoModalFill",
  uri: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
};

export const VideoModalTemplate = Template.bind({});
VideoModalTemplate.args = {
  id: "BasicVideoModal",
};
