import { Story, Meta } from "@storybook/html";
import { createToast, ToastProps } from "./Toast";

export default {
  title: "Components/Toast",
  argTypes: {
    id: { control: { disable: true } },
    show: { control: { type: "boolean" } },
  },
} as Meta;

const Template: Story<ToastProps> = (args) =>
  createToast(args);

export const BasicToast = Template.bind({});
BasicToast.args = {
  id: "BasicToast",
  show: "yes",
};
