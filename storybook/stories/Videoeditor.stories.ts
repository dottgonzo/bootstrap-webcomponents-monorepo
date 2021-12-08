import { Story, Meta } from "@storybook/html";
import { createVideoeditor, VideoeditorProps } from "./Videoeditor";

export default {
  title: "Contents/VideoEditor",
  argTypes: {
    id: { control: { disable: true } },
    src: { type: "string" },

    changeTrackValues: { action: "changeTrackValuesEvent" },
    dispatchTrack: { action: "dispatchTrackEvent" },
  },
} as Meta;

const track = {
  maxValue: 100,
  minValue: 0,
};

const Template: Story<VideoeditorProps> = (args) => createVideoeditor(args);

export const BasicVideoeditor = Template.bind({});
BasicVideoeditor.args = {
  id: "BasicVideoeditor",
  src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
};
export const BasicVideoeditorWithTrack = Template.bind({});
BasicVideoeditorWithTrack.args = {
  id: "BasicVideoeditorWithTrack",
  track,
  src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
};
