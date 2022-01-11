import { Story, Meta } from "@storybook/html";
import { webComponentBind } from "./utils/webComponentUtils";
const meta: Meta = {
  title: "Components/Dialog",
  argTypes: {
    id: { control: { disable: true } },
    show: { control: { type: "boolean" } },
  },
};
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, "dialog");

export const BasicBootstapModal = Template.bind({});
BasicBootstapModal.args = {
  id: "BasicBootstapModal",
  show: true,
};
