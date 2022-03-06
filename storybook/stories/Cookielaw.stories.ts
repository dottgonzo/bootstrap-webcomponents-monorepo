import { Story, Meta } from "@storybook/html";
import {
  webComponentBind,
  argTypesExtraUtils,
} from "./utils/webComponentUtils";
import { storybookArgs } from "../../packages/cookie-law-banner/extra/docs";

const meta: Meta = {
  title: "Components/Cookielaw",
  argTypes: Object.assign(argTypesExtraUtils, storybookArgs),

  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, "cookie-law-banner");

export const CookielawSimple = Template.bind({});
CookielawSimple.args = {
  id: "CookielawSimple",
};
export const CookielawWithDecline = Template.bind({});
CookielawWithDecline.args = {
  id: "CookielawWithDecline",
  allowdecline: true,
};
