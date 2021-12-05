import { Story, Meta } from "@storybook/html";
import { createVideoeditor, VideoeditorProps } from "./Videoeditor";

export default {
  title: "Contents/VideoEditor",
  argTypes: {
    id: { control: { disable: true } },
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
};
export const BasicVideoeditorWithTracks = Template.bind({});
BasicVideoeditorWithTracks.args = {
  id: "BasicVideoeditorWithTracks",
  track,
};
