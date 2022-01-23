/*
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
*/

import { Story, Meta } from "@storybook/html";
import { webComponentBind } from "./utils/webComponentUtils";
const meta: Meta = {
  title: "Components/Toast",
  argTypes: {
    id: { control: { disable: true } },
    show: { control: { type: "boolean" } },
    body: { control: { type: "string" } },
    header: { control: { type: "object" } },
    headerImg: {
      options: ["IMG", "SVG"],
      control: { type: "select" }, 
    },
  },
};
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, "toast");

export const Basic = Template.bind({});
Basic.args = {
  id: "Basic",
  show: true,
  body: "Hello, world! This is a toast message.",
  header: JSON.stringify({
    img: `<img
      data-src="holder.js/200x200"
      class="bd-placeholder-img rounded me-2"
      alt="200x200"
      src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_17e7e03606d%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_17e7e03606d%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2274.4296875%22%20y%3D%22104.5%22%3E200x200%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
      data-holder-rendered="true"
      style="width: 20px; height: 20px"
    />`,
    // 			img: `<svg
    // 	slot="headerImg"
    // 	class="bd-placeholder-img rounded me-2"
    // 	width="20"
    // 	height="20"
    // 	xmlns="http://www.w3.org/2000/svg"
    // 	aria-hidden="true"
    // 	preserveAspectRatio="xMidYMid slice"
    // 	focusable="false"
    // >
    // 	<rect width="100%" height="100%" fill="#007aff"></rect>
    // </svg>`,
    small: "11 mins ago",
    strong: "Bootstrap",
  }),
};
