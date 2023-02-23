import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import lernaPkg from "../../lerna.json";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/checkout-shopping-cart/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(
    args,
    meta.argTypes as any,
    componentSetup.repoName,
    lernaPkg.version,
    {
      style: { margin: "20px auto 20px auto" },
    }
  );

export const CheckoutShoppingCart = Template.bind({});

CheckoutShoppingCart.args = {
  id: "CheckoutShoppingCart",
  payment: {
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
  },
};

export const CheckoutShoppingCartCompleted = Template.bind({});

CheckoutShoppingCartCompleted.args = {
  id: "CheckoutShoppingCartCompleted",
  payment: {
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
  },
};
