import { Story, Meta } from "@storybook/html";
import { createCookielaw, CookielawProps } from "./Cookielaw";

const meta: Meta = {
  title: "Components/Cookielaw",
  argTypes: {
    id: { control: { disable: true } },
    allowdecline: { control: { type: "boolean" } },

    acceptCookieLaw: { action: "acceptCookieLawEvent" },
  },
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

const Template: Story<CookielawProps> = (args) => createCookielaw(args);

export const CookielawSimple = Template.bind({});
CookielawSimple.args = {
  id: "CookielawSimple",
};
export const CookielawWithDecline = Template.bind({});
CookielawWithDecline.args = {
  id: "CookielawWithDecline",
  allowdecline: true,
};
