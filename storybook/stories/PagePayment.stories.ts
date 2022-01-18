import { Story, Meta } from "@storybook/html";
import { webComponentBind } from "./utils/webComponentUtils";

const meta: Meta = {
  title: "Pages/PagePayment",

  argTypes: {
    id: { control: { disable: true } },
  },
};

export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, "page-payment");

export const PagePayment = Template.bind({});

PagePayment.args = {
  id: "PagePayment",
};
