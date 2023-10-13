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
} from "../../packages/checkout/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "Payment/Checkout",
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

const paypal = {
  id: "paypal",
  label: "bbbb",
  paypalid: "test",
};

const googlepay = {
  id: "google",
  label: "GooglePay",
  gatewayId: "example",
  gatewayMerchantId: "exampleGatewayMerchantId",
};

const defaultPayment = {
  merchantName: "testmerchant",
  countryCode: "it",
  currencyCode: "EUR",
  total: 45,
  type: "buy",
};

export const CheckoutPaypal = {
  args: {
    id: "CheckoutPaypal",
    shipments: [
      {
        price: 10,
        currency: "€",

        arriveDate: "2022-01-20T08:03:57.562Z",
        available: true,
        label: "zio barca",
        id: "ziobarca",
      },
      {
        price: 20,
        currency: "€",

        arriveDate: "2022-01-21T02:22:57.562Z",
        available: true,
        label: "zio barca2",
        id: "ziobarca2",
      },
    ],
    gateways: [paypal],
    payment: defaultPayment,
  },
};

export const CheckoutPaypalWithUser = {
  args: {
    id: "CheckoutPaypalWithUser",
    shipments: [
      {
        price: 10,
        currency: "€",

        arriveDate: "2022-01-20T08:03:57.562Z",
        available: true,
        label: "zio barca",
        id: "ziobarca",
      },
      {
        price: 20,
        currency: "€",

        arriveDate: "2022-01-21T02:22:57.562Z",
        available: true,
        label: "zio barca2",
        id: "ziobarca2",
      },
    ],
    user: {
      fullName: "fdfff fffff",
      addressWithNumber: "addreess 43",
      city: "ff",
      nationality: "effe",
      zip: "3434",
    },
    gateways: [paypal],
    payment: defaultPayment,
  },
};

export const CheckoutPaypalWithUserAndShipping = {
  args: {
    id: "CheckoutPaypalWithUserAndShipping",
    shipments: [
      {
        price: 10,
        currency: "€",

        arriveDate: "2022-01-20T08:03:57.562Z",
        available: true,
        label: "zio barca",
        id: "ziobarca",
        selected: true,
      },
      {
        price: 20,
        currency: "€",

        arriveDate: "2022-01-21T02:22:57.562Z",
        available: true,
        label: "zio barca2",
        id: "ziobarca2",
      },
    ],
    user: {
      fullName: "fdfff fffff",
      addressWithNumber: "addreess 43",
      city: "ff",
      nationality: "effe",
      zip: "3434",
    },
    gateways: [paypal, googlepay],
    payment: defaultPayment,
  },
};

export const CheckoutWithPaypalOnlyPayment = {
  args: {
    id: "CheckoutWithPaypalOnlyPayment",
    shipments: [
      {
        price: 10,
        currency: "€",

        arriveDate: "2022-01-20T08:03:57.562Z",
        available: true,
        label: "zio barca",
        id: "ziobarca",
        selected: true,
      },
      {
        price: 20,
        currency: "€",

        arriveDate: "2022-01-21T02:22:57.562Z",
        available: true,
        label: "zio barca2",
        id: "ziobarca2",
      },
    ],
    user: {
      fullName: "fdfff fffff",
      addressWithNumber: "addreess 43",
      city: "ff",
      nationality: "effe",
      zip: "3434",
    },
    gateways: [paypal],
    payment: defaultPayment,
  },
};
export const CheckoutWithGoogleOnlyPayment = {
  args: {
    id: "CheckoutWithGoogleOnlyPayment",
    shipments: [
      {
        price: 10,
        currency: "€",

        arriveDate: "2022-01-20T08:03:57.562Z",
        available: true,
        label: "zio barca",
        id: "ziobarca",
        selected: true,
      },
      {
        price: 20,
        currency: "€",

        arriveDate: "2022-01-21T02:22:57.562Z",
        available: true,
        label: "zio barca2",
        id: "ziobarca2",
      },
    ],
    user: {
      fullName: "fdfff fffff",
      addressWithNumber: "addreess 43",
      city: "ff",
      nationality: "effe",
      zip: "3434",
    },
    gateways: [googlepay],
    payment: defaultPayment,
  },
};

export const CheckoutWithGoogleSubscribe = {
  args: {
    id: "CheckoutWithGoogleSubscribe",
    shipments: [],
    user: {
      fullName: "fdfff fffff",
      addressWithNumber: "addreess 43",
      city: "ff",
      nationality: "effe",
      zip: "3434",
    },
    gateways: [googlepay],
    payment: Object.assign({}, defaultPayment, { type: "subscribe" }),
  },
};

export const CheckoutCompleted = {
  args: {
    id: "CheckoutCompleted",
    shipments: [],
    user: {
      fullName: "fdfff fffff",
      addressWithNumber: "addreess 43",
      city: "ff",
      nationality: "effe",
      zip: "3434",
    },
    gateways: [googlepay],
    payment: defaultPayment,
    completed: "yes",
  },
};
