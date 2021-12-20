import { Story, Meta } from "@storybook/html";
import { createToast, ToastProps } from "./Toast";

export default {
  title: "Components/Dialog",
  argTypes: {
    id: { control: { disable: true } },
    show: { control: { type: "boolean" } },
  },
} as Meta;

const Template: Story<ToastProps> = (args) =>
  createToast(args);

export const BasicBootstapModal = Template.bind({});
BasicBootstapModal.args = {
  id: "BasicBootstapModal",
  show: "yes",
};
