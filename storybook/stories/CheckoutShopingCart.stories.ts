import { Story, Meta } from "@storybook/html";
import { webComponentBind } from "./utils/webComponentUtils";

const meta: Meta = {
  title: "Components/CheckoutShoppingCart",

  argTypes: {
    id: { control: { disable: true } },
    payment: { control: { type: "object" } },
    items: { control: { type: "array" } },
    completed: { control: { type: "radio" }, options: ["yes", "no"] },
  },
};

export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, "checkout-shopping-cart", {
    style: { margin: "20px auto 20px auto" },
  });

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

export const CheckoutShoppingCartCompleted = Template.bind({});

CheckoutShoppingCartCompleted.args = {
  id: "CheckoutShoppingCartCompleted",
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
  completed: "yes",
};
