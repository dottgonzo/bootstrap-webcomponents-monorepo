import { Story, Meta } from "@storybook/html";
import {
  webComponentBind,
  argTypesExtraUtils,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/contact-item/extra/docs";

const copy1 = Object.assign({}, argTypesExtraUtils);
const copy2 = Object.assign({}, storybookArgs);

const assigned = Object.assign({}, copy1, copy2);
const meta: Meta = {
  title: componentSetup.category + "/Contact",
  argTypes: assigned,
};

export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, componentSetup.name);

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
