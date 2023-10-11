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
} from "../../packages/page-checkout/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "Pages/Checkout",
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
const defaultgw = {
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
export const PageCheckoutPaypal = {
  id: "PageCheckoutPaypal",
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

      arriveDate: "2022-01-21T02:22:57.562Z",
      available: true,
      label: "zio barca2",
      id: "ziobarca2",
      currency: "€",
    },
  ],
  gateways: [defaultgw, googlepay],
  payment: {
    countryCode: "IT",
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

export const PageCheckoutPaypalWithUser = {
  id: "PageCheckoutPaypalWithUser",
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
  gateways: [defaultgw, googlepay],
  payment: {
    countryCode: "IT",
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

export const PageCheckoutPaypalWithUserAndShipment = {
  id: "PageCheckoutPaypalWithUserAndShipment",
  shipments: [
    {
      price: 10,
      currency: "€",

      arriveDate: "2022-01-20T08:03:57.562Z",
      available: true,
      label: "zio barca",
      id: "ziobarca",
      standard: true,
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
  gateways: [defaultgw, googlepay],
  payment: {
    countryCode: "IT",
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

export const PageCheckoutPaypalService = {
  id: "PageCheckoutPaypalService",
  shipments: [],
  user: {
    fullName: "fdfff fffff",
    addressWithNumber: "addreess 43",
    city: "ff",
    nationality: "effe",
    zip: "3434",
    fixed: true,
  },
  gateways: [defaultgw, googlepay],
  payment: {
    countryCode: "IT",
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
export const PageCheckoutCompleted = {
  id: "PageCheckoutCompleted",
  shipments: [],
  user: {
    fullName: "fdfff fffff",
    addressWithNumber: "addreess 43",
    city: "ff",
    nationality: "effe",
    zip: "3434",
    fixed: true,
  },
  gateways: [defaultgw, googlepay],
  payment: {
    countryCode: "IT",
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
  completed: "yes",
};
