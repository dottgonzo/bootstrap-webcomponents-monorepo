import { Story, Meta } from "@storybook/html";
import {
  webComponentBind,
  argTypesExtraUtils,
} from "./utils/webComponentUtils";

const meta: Meta = {
  title: "Components/PageBanner",

  argTypes: {
    logouri: { control: { type: "text" } },
    title: { control: { type: "text" } },
    description: { control: { type: "text" } },
    id: { control: { disable: true } },
  },
};

export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, "banner");

export const PageBanner = Template.bind({});

PageBanner.args = {
  id: "PageBanner",
  title: "test",
  description: "desc",
  logouri:
    "https://s3-eu-west-1.amazonaws.com/kernelpublic/selargius/logo_selargius.jpg",
};
