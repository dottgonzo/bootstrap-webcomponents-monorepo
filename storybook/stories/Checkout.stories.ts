import { Story, Meta } from "@storybook/html";
import { webComponentBind } from "./utils/webComponentUtils";

const meta: Meta = {
  title: "Components/CheckoutPaypal",

  argTypes: {
    id: { control: { disable: true } },
    shipments: { control: { type: "array" } },
    user: { control: { type: "object" } },
    payByCard: { action: "payByCard" },
    payByAccount: { action: "payByAccount" },
    saveUser: { action: "saveUser" },
    saveShipment: { action: "saveShipment" },
    gateways: { control: { type: "array" } },
  },
};

export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, "checkout", {
    style: { margin: "20px auto 20px auto" },
  });

const defaultgw = {
  id: "paypal",
  label: "bbbb",
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
  gateways: [defaultgw],
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
  gateways: [defaultgw],
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
  gateways: [defaultgw],
};
