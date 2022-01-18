import { Story, Meta } from "@storybook/html";
import { webComponentBind } from "./utils/webComponentUtils";

const meta: Meta = {
  title: "Pages/Invoice",
  argTypes: {
    id: { control: { disable: true } },
  },
};

export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, "invoice");

export const InvoceTemplate = Template.bind({});
InvoceTemplate.args = {
  id: "InvoceTemplate",
};
