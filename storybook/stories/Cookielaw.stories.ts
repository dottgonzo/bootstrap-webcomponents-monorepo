import { Story, Meta } from "@storybook/html";
import {
  webComponentBind,
  argTypesExtraUtils,
} from "./utils/webComponentUtils";
import { storybookArgs } from "../../packages/cookie-law-banner/extra/docs";

const copy1 = Object.assign({}, argTypesExtraUtils);
const copy2 = Object.assign({}, storybookArgs);

const assigned = Object.assign({}, copy1, copy2);
const meta: Meta = {
  title: "Components/Cookielaw",
  argTypes: assigned,

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
