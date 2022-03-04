import { Story, Meta } from "@storybook/html";
import { webComponentBind } from "./utils/webComponentUtils";

const meta: Meta = {
  title: "Pages/Invoice",
  argTypes: {
    id: { control: { disable: true } },
    headers: { control: { type: "object" } },
    items: { control: { type: "array" } },
  },
};

export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, "page-invoice");

export const InvoceTemplate = Template.bind({});
InvoceTemplate.args = {
  id: "InvoceTemplate",
  headers: {
    serial: "seriale1",
    from: {
      piva: "piva",
      name: "companyfrom",
      address: "address",
      email: "email",
      phone: "phone",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/af/Free_Content_Logo.svg",
      shortName: "Acme SpA",
    },
    to: {
      piva: "to iva",
      name: "to name",
      address: "to address",
      email: "to@email.com",
      phone: "tototo",
    },
  },
  items: [
    {
      unitaryPrice: 2,
      taxPercentage: 3,
      desc: "testitem",
    },
    {
      unitaryPrice: 5,
      taxPercentage: 7,
      desc: "testitem2",
    },
  ],
};
