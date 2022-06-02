import { Story, Meta } from "@storybook/html";
import {
  webComponentBind,
  argTypesExtraUtils,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/page-checkout/extra/docs";

const copy1 = Object.assign({}, argTypesExtraUtils);
const copy2 = Object.assign({}, storybookArgs);

const assigned = Object.assign({}, copy1, copy2);
const meta: Meta = {
  title: componentSetup.category + "/PageCheckout",
  argTypes: assigned,
};

export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, "page-checkout");
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
export const PageCheckoutPaypal = Template.bind({});

PageCheckoutPaypal.args = {
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

export const PageCheckoutPaypalWithUser = Template.bind({});

PageCheckoutPaypalWithUser.args = {
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

export const PageCheckoutPaypalWithUserAndShipment = Template.bind({});

PageCheckoutPaypalWithUserAndShipment.args = {
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

export const PageCheckoutPaypalService = Template.bind({});

PageCheckoutPaypalService.args = {
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
export const PageCheckoutCompleted = Template.bind({});

PageCheckoutCompleted.args = {
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
