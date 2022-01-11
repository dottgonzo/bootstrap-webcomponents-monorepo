import { Story, Meta } from "@storybook/html";
import { webComponentBind } from "./utils/webComponentUtils";

const meta: Meta = {
  title: "Components/Downloader",
  argTypes: {
    id: { control: { disable: true } },
    uri: { control: { type: "text" } },
    targetfilename: { control: { type: "text" } },
    headers: { control: { type: "text" } },
    downloadid: { control: { type: "text" } },
  },
};

export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, "downloader");

export const DownloaderTemplate = Template.bind({});
DownloaderTemplate.args = {
  id: "BasicDownloader",
};
