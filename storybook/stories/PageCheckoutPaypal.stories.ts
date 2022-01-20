import { Story, Meta } from "@storybook/html";
import { webComponentBind } from "./utils/webComponentUtils";

const meta: Meta = {
  title: "Pages/PageCheckoutPaypal",

  argTypes: {
    id: { control: { disable: true } },
    shipments: { control: { type: "array" } },
    items: { control: { type: "array" } },
    user: { control: { type: "object" } },
    payByCard: { action: "payByCard" },
    payByAccount: { action: "payByAccount" },
    saveUser: { action: "saveUser" },
    saveShipment: { action: "saveShipment" },
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
  user: {
    fullName: "fdfff fffff",
    addressWithNumber: "addreess 43",
    city: "ff",
    nationality: "effe",
    zip: "3434",
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
  user: {
    fullName: "fdfff fffff",
    addressWithNumber: "addreess 43",
    city: "ff",
    nationality: "effe",
    zip: "3434",
  },
};
