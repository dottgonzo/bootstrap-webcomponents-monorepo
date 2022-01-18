import { Story, Meta } from "@storybook/html";
import { webComponentBind } from "./utils/webComponentUtils";

const meta: Meta = {
  title: "Components/CheckoutPaypal",

  argTypes: {
    id: { control: { disable: true } },
    shipments: { control: { type: "array" } },
    user: { control: { type: "object" } },
  },
};

export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, "checkout-paypal");

export const CheckoutPaypal = Template.bind({});

CheckoutPaypal.args = {
  id: "CheckoutPaypal",
  shipments: [
    {
      price: 10,

      durationInSeconds: 0,
      available: true,
    },
  ],
};
