import "./main.css";
import type { Meta } from "@storybook/html";
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

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "Payment/CheckoutShoppingCart",
  tags: ["autodocs"],

  parameters: meta.parameters,

  argTypes: meta.argTypes,
  render: ({ label, ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    // @ts-ignore
    return webComponentBind(
      args,
      meta.argTypes,
      componentSetup.repoName,
      lernaPkg.version
    );
  },
};

export const CheckoutShoppingCart = {
  args: {
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
  },
};

export const CheckoutShoppingCartCompleted = {
  args: {
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
  },
};
