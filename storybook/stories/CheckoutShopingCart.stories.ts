import { Story, Meta } from "@storybook/html";
import { webComponentBind } from "./utils/webComponentUtils";

const meta: Meta = {
  title: "Components/CheckoutShoppingCart",

  argTypes: {
    id: { control: { disable: true } },
    headers: { control: { type: "object" } },
    items: { control: { type: "array" } },
  },
};

export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, "checkout-shopping-cart");

export const CheckoutShoppingCart = Template.bind({});

CheckoutShoppingCart.args = {
  id: "CheckoutShoppingCart",
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
