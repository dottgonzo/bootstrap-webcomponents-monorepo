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
  },
};

export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, "checkout-paypal", {
    style: { width: "600px", margin: "20px auto 20px auto" },
  });

export const CheckoutPaypal = Template.bind({});

CheckoutPaypal.args = {
  id: "CheckoutPaypal",
  shipments: [
    {
      price: 10,

      durationInSeconds: 0,
      available: true,
      label: "zio barca",
      id: "ziobarca",
    },
  ],
};

export const CheckoutPaypalWithUser = Template.bind({});

CheckoutPaypalWithUser.args = {
  id: "CheckoutPaypalWithUser",
  shipments: [
    {
      price: 10,

      durationInSeconds: 0,
      available: true,
      label: "zio barca",
      id: "ziobarca",
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

export const CheckoutPaypalWithUserAndShipping = Template.bind({});

CheckoutPaypalWithUserAndShipping.args = {
  id: "CheckoutPaypalWithUserAndShipping",
  shipments: [
    {
      price: 10,

      durationInSeconds: 0,
      available: true,
      label: "zio barca",
      id: "ziobarca",
      selected: true,
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
