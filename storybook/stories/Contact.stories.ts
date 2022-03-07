import { Story, Meta } from "@storybook/html";
import {
  webComponentBind,
  argTypesExtraUtils,
} from "./utils/webComponentUtils";
import { storybookArgs } from "../../packages/contact-item/extra/docs";

const meta: Meta = {
  title: "Components/Contact",
  argTypes: Object.assign(argTypesExtraUtils, storybookArgs),
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
