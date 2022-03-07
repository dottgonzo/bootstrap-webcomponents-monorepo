import { Story, Meta } from "@storybook/html";
import {
  webComponentBind,
  argTypesExtraUtils,
} from "./utils/webComponentUtils";
import { storybookArgs } from "../../packages/downloader/extra/docs";

const meta: Meta = {
  title: "Components/Downloader",
  argTypes: Object.assign(argTypesExtraUtils, storybookArgs),
};

export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, "downloader");

export const DownloaderTemplate = Template.bind({});
DownloaderTemplate.args = {
  id: "BasicDownloader",
};
