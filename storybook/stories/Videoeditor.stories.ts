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

const Template: Story<VideoeditorProps> = (args) => createVideoeditor(args);

export const BasicVideoeditor = Template.bind({});
BasicVideoeditor.args = {
  id: "BasicVideoeditor",
};
