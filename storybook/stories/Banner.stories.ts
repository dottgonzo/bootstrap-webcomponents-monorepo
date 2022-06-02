import type { Story } from "@storybook/html";
import { webComponentBind, getStorybookMeta } from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/banner/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, componentSetup.name);

export const PageBanner = Template.bind({});

PageBanner.args = {
  id: "PageBanner",
  title: "test",
  description: "desc",
  logouri:
    "https://s3-eu-west-1.amazonaws.com/kernelpublic/selargius/logo_selargius.jpg",
};
