import { Story, Meta } from "@storybook/html";
import { webComponentBind } from "./utils/webComponentUtils";

const meta: Meta = {
  title: "Payments/Google",
  argTypes: {
    id: { control: { disable: true } },
    payByAccount: { action: "payByAccount" },
  },
};

export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, "payment-google");

export const SimpleGooglePay = Template.bind({});
SimpleGooglePay.args = {
  id: "SimpleGooglePay",
};
