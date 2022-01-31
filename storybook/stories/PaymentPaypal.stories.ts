import { Story, Meta } from "@storybook/html";
import { webComponentBind } from "./utils/webComponentUtils";

const meta: Meta = {
  title: "Payments/Paypal",
  argTypes: {
    id: { control: { disable: true } },
    payByCard: { action: "payByCard" },
    paymentCompleted: { action: "paymentCompleted" },
    paypalid: { control: { type: "string" } },
    currency: { control: { type: "string" } },
  },
};

export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, "payment-paypal");

export const SimplePaypal = Template.bind({});
SimplePaypal.args = {
  id: "SimplePaypal",
  label: "bbbb",
  paypalid: "test",
};
