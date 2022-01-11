import { Story, Meta } from "@storybook/html";
import { webComponentBind } from "./utils/webComponentUtils";

const meta: Meta = {
  title: "Components/Contact",
  argTypes: {
    id: { control: { disable: true } },
    phone: { control: { type: "object" } },
    address: { control: { type: "object" } },
    email: { control: { type: "object" } },
    site: { control: { type: "object" } },
    config: { control: { type: "object" } },
    contactclick: { action: "contactClickEvent" },
  },
};

export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, "contact-item");

export const ContactPhone = Template.bind({});
ContactPhone.args = {
  id: "ContactPhone",
  phone: { number: 465564 },
};
export const ContactEmail = Template.bind({});
ContactEmail.args = {
  id: "ContactEmail",
  email: { address: "dev@dariocaruso.info" },
};
export const ContactSite = Template.bind({});
ContactSite.args = {
  id: "ContactSite",
  site: {
    uri: "https://dariocaruso.info",
    label: "dariocaruso.info",
    open: true,
  },
};
export const ContactAddress = Template.bind({});
ContactAddress.args = {
  id: "ContactAddress",
  address: { address: "egeg" },
};
