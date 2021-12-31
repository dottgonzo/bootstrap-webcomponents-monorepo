import { Story, Meta } from "@storybook/html";
import { createToast, ToastProps } from "./Toast";

export default {
  title: "Components/Toast",
  argTypes: {
    id: { control: { disable: true } },
    show: { control: { type: "boolean" } },
    // headerImg:{
    //   options: ['IMG', 'SVG'],
    //   mapping: {
    //     IMG: `<img src="..." class="rounded me-2" alt="...">`,
    //     SVG: `<svg class="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#007aff"></rect></svg>`,
    //   },
    // },
    header: {
      options: ['img', 'small', 'strong'],
      control: { type: 'select' }, // Automatically inferred when 'options' is defined
    },
    body: { control: { type: "string" } },
  },
} as Meta;

const Template: Story<ToastProps> = (args) =>
  createToast(args);

export const BasicToast = Template.bind({});
BasicToast.args = {
  id: "BasicToast",
  show: "yes",
  header: JSON.stringify({
    // img: `<img src="..." class="rounded me-2" alt="..." />`,
    img: `<svg class="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#007aff"></rect></svg>`,
    small: "11 mins ago",
    strong: "Bootstrap"
  }),
  body: "Hello, world! This is a toast message.",
};
