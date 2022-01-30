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
    toast_class: { control: { type: "text" } },
    btn_close_class: { control: { type: "text" } },
    custom_content: { control: { type: "text" } },
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
  toast_class: "",
  btn_close_class:"",
  custom_content: "",
};
  
export const Basic = Template.bind({});
Basic.args = {...basicArgs};
Basic.decorators = [
  (story) => `<div class="bd-example bg-light">${story().outerHTML}</div>`,
];

export const LiveExample = Template.bind({});
LiveExample.args = {...basicArgs};
LiveExample.args.id = "LiveExample";
LiveExample.decorators = [
    (story) => `<div>
    <div class="bd-example">
        <button type="button" class="btn btn-primary" id="liveToastBtn">Show live toast</button>
    </div>
    <script>
        document.getElementById('liveToastBtn')?.addEventListener('click', function () {
            const elem = document.getElementById("LiveExample");
            if (elem.getAttribute('show') && elem.getAttribute('show') === 'yes') {
                elem.setAttribute('show', 'no');
            } else {
                elem.setAttribute('show', 'yes');
            }
        })
    </script>
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
        ${story().outerHTML}
    </div>
  </div>`,
];

export const Translucent = Template.bind({});
Translucent.args = {...basicArgs};
Translucent.args.id = "Translucent";
Translucent.decorators = [
  (story) => `<div class="bd-example bg-dark">${story().outerHTML}</div>`,
];

export const Stacking = Template.bind({});
Stacking.args = {...basicArgs};
Stacking.args.id = "Stacking";
Stacking.decorators = [
  (story) => {
    const story1 = story().cloneNode(true);
    const story2 = story().cloneNode(true);
    story1.setAttribute("header_small", "just now");
    story1.setAttribute("body", "See? Just like this.");
    story2.setAttribute("header_small", "2 seconds ago");
    story2.setAttribute("body", "Heads up, toasts will stack automatically");

    return `<div>
    <style>
        .toast-container>:not(:last-child) {
            margin-bottom: 0.75rem;
        }
    </style>
    <div class="bd-example bg-light">
        <div class="toast-container">
            ${story1.outerHTML}
            ${story2.outerHTML}
        </div>
    </div>
</div>`;
  },
];

export const CustomContent = Template.bind({});
CustomContent.args = {...basicArgs};
CustomContent.args.id = "CustomContent";
CustomContent.args.toast_class = "align-items-center";
CustomContent.args.btn_close_class = "btn-close me-2 m-auto";
delete CustomContent.args.header_small;
delete CustomContent.args.header_strong;
delete CustomContent.args.header_img;
CustomContent.decorators = [
  (story) => {
    return `<div class="bd-example bg-light">
    ${story().outerHTML}
</div>`;
  },
];

export const AdditionalCustomContent = Template.bind({});
AdditionalCustomContent.args = {...basicArgs};
AdditionalCustomContent.args.id = "AdditionalCustomContent";
AdditionalCustomContent.args.btn_close_class = "btn btn-secondary btn-sm";
AdditionalCustomContent.args.custom_content = `<button type="button" class="btn btn-primary btn-sm">Take action</button>`;
delete AdditionalCustomContent.args.header_small;
delete AdditionalCustomContent.args.header_strong;
delete AdditionalCustomContent.args.header_img;
AdditionalCustomContent.decorators = [
  (story) => {
    return `<div class="bd-example bg-light">
    ${story().outerHTML}
</div>`;
  },
];
export const ColorSchemes = Template.bind({});
ColorSchemes.args = {...basicArgs};
ColorSchemes.args.id = "ColorSchemes";
ColorSchemes.args.toast_class = "align-items-center text-white bg-primary border-0";
ColorSchemes.args.btn_close_class = "btn-close btn-close-white me-2 m-auto";
// ColorSchemes.args.custom_content = `<button type="button" class="btn btn-primary btn-sm">Take action</button>`;
delete ColorSchemes.args.header_small;
delete ColorSchemes.args.header_strong;
delete ColorSchemes.args.header_img;
ColorSchemes.decorators = [
  (story) => {
    return `<div class="bd-example bg-light">
    ${story().outerHTML}
</div>`;
  },
];
