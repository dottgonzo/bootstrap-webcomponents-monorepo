import { Story, Meta } from "@storybook/html";
import {
  webComponentBind,
  argTypesExtraUtils,
} from "./utils/webComponentUtils";
import { storybookArgs } from "../../packages/checkout/extra/docs";

const meta: Meta = {
  title: "Components/Checkout",
  argTypes: Object.assign(argTypesExtraUtils, storybookArgs),
};

export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, "checkout", {
    style: { margin: "20px auto 20px auto" },
  });

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

export const CheckoutPaypal = Template.bind({});

CheckoutPaypal.args = {
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
};

export const CheckoutPaypalWithUser = Template.bind({});

CheckoutPaypalWithUser.args = {
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
};

export const CheckoutPaypalWithUserAndShipping = Template.bind({});

CheckoutPaypalWithUserAndShipping.args = {
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
};

export const CheckoutWithPaypalOnlyPayment = Template.bind({});

CheckoutWithPaypalOnlyPayment.args = {
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
};

export const CheckoutWithGoogleOnlyPayment = Template.bind({});

CheckoutWithGoogleOnlyPayment.args = {
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
};

export const CheckoutWithGoogleSubscribe = Template.bind({});

CheckoutWithGoogleSubscribe.args = {
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
};

export const CheckoutCompleted = Template.bind({});

CheckoutCompleted.args = {
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
};
