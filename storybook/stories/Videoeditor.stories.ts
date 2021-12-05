import { Story, Meta } from "@storybook/html";
import { createVideoeditor, VideoeditorProps } from "./Videoeditor";

export default {
  title: "Contents/VideoEditor",
  argTypes: {
    id: { control: { disable: true } },
    changeTrackValues: { action: "changeTrackValuesEvent" },
    dispatchTracks: { action: "dispatchTracksEvent" },
  },
} as Meta;

const tracks = [
  {
    maxValue: 100,
    minValue: 0,
    name: "track1",
  },
  {
    maxValue: 100,
    minValue: 0,
    name: "track2",
  },
  {
    maxValue: 100,
    minValue: 0,
    name: "track3",
  },
];

const Template: Story<VideoeditorProps> = (args) => createVideoeditor(args);

export const BasicVideoeditor = Template.bind({});
BasicVideoeditor.args = {
  id: "BasicVideoeditor",
};
export const BasicVideoeditorWithTracks = Template.bind({});
BasicVideoeditorWithTracks.args = {
  id: "BasicVideoeditorWithTracks",
  tracks,
};
