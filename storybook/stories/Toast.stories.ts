import { Story, Meta } from "@storybook/html";
import { webComponentBind } from "./utils/webComponentUtils";
const meta: Meta = {
  title: "Components/Toast",
  argTypes: {
    id: { control: { type: "text" } },
    show: { control: { type: "boolean" } },
    header_small: { control: { type: "text" } },
    header_strong: { control: { type: "text" } },
    header_img: { control: { type: "text" } },
    body: { control: { type: "text" } },
    toastShow: { action: "toastShow" },
    toastConfirm: { action: "toastConfirm" },
  },
};

export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, "toast");

const basicArgs = {
  id: "Basic",
  header_img: `<svg
  class="bd-placeholder-img rounded me-2"
  width="20"
  height="20"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
  preserveAspectRatio="xMidYMid slice"
  focusable="false"
>
  <rect width="100%" height="100%" fill="#007aff"></rect>
</svg>`,
  header_strong: "Bootstrap",
  header_small: "11 mins ago",
  show: true,
  body: "Hello, world! This is a toast message.",
};
  
export const Basic = Template.bind({});
Basic.args = {...basicArgs};

export const LiveExample = Template.bind({});
LiveExample.args = {...basicArgs, id: "LiveExample"};
LiveExample.decorators = [
  (story) => `<div style="">
  <button type="button" class="btn btn-primary" id="liveToastBtn">Show live toast</button>
  <script>
    document.getElementById('liveToastBtn')?.addEventListener('click', function () {
      const elem = document.getElementById("LiveExample");
      if (elem.getAttribute('show')&&elem.getAttribute('show')==='yes') {
        elem.setAttribute('show','no');
      } else {
        elem.setAttribute('show','yes');
      }
    })
  </script>
  ${story().outerHTML}
  </div>`,
];
