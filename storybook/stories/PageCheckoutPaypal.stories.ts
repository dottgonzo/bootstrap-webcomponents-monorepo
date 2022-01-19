import { Story, Meta } from "@storybook/html";
import { webComponentBind } from "./utils/webComponentUtils";

const meta: Meta = {
  title: "Pages/PageCheckoutPaypal",

  argTypes: {
    id: { control: { disable: true } },
    shipments: { control: { type: "array" } },
    items: { control: { type: "array" } },
    user: { control: { type: "object" } },
    payByCard: { control: { type: "boolean" } },
    payByAccount: { control: { type: "boolean" } },
  },
};

export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, "page-checkout-paypal");

export const PageCheckoutPaypal = Template.bind({});

PageCheckoutPaypal.args = {
  id: "PageCheckoutPaypal",
  shipments: [
    {
      price: 10,

      durationInSeconds: 0,
      available: true,
    },
  ],
  items: [
    {
      unitaryPrice: 2,
      taxPercentage: 3,
      name: "testitem",
    },
    {
      unitaryPrice: 5,
      taxPercentage: 7,
      name: "testitem2",
    },
  ],
};
