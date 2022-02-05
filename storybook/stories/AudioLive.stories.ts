import { Story, Meta } from "@storybook/html";
import { webComponentBind } from "./utils/webComponentUtils";
const meta: Meta = {
  title: "Components/AudioLive",
  argTypes: {
    id: { control: { type: "text" } },
  },
};

export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, "player-audio-live");

export const AudioLiveTemplate = Template.bind({});
AudioLiveTemplate.args = {
  id: "AudioLiveTemplate",
};
