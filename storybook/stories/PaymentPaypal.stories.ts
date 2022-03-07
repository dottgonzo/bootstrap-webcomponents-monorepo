import { Story, Meta } from "@storybook/html";
import {
  webComponentBind,
  argTypesExtraUtils,
} from "./utils/webComponentUtils";
import { storybookArgs } from "../../packages/payment-paypal/extra/docs";

const meta: Meta = {
  title: "Payments/Paypal",
  argTypes: Object.assign(argTypesExtraUtils, storybookArgs),
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
