import { Story, Meta } from "@storybook/html";
import {
  webComponentBind,
  argTypesExtraUtils,
} from "./utils/webComponentUtils";
import { storybookArgs } from "../../packages/searchbar/extra/docs";

const copy1 = Object.assign({}, argTypesExtraUtils);
const copy2 = Object.assign({}, storybookArgs);

const assigned = Object.assign({}, copy1, copy2);
const meta: Meta = {
  title: "Components/Searchbar",
  argTypes: assigned,
};

export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, "searchbar");

export const Searchbar1 = Template.bind({});
Searchbar1.args = {
  id: "Searchbar1",
  // TODO: to be completed
};

// export const LiveExample = Template.bind({});
// LiveExample.args = {
//   id: "LiveExample",
//   small: "11 mins ago",
//   title: "Bootstrap",
//   show: false,
//   content: "Hello, world! This is a toast message.",
//   img: "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_17e7e03606d%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_17e7e03606d%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2274.4296875%22%20y%3D%22104.5%22%3E200x200%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
// };
// LiveExample.decorators = [
//   (story) => `<div style="">
//   <button type="button" class="btn btn-primary" id="liveToastBtn">Show live toast</button>
//   <script>
//     document.getElementById('liveToastBtn')?.addEventListener('click', function () {
//       const elem = document.getElementById("LiveExample");
//       if (elem.getAttribute('show')&&elem.getAttribute('show')==='yes') {
//         elem.setAttribute('show','no');
//       } else {
//         elem.setAttribute('show','yes');
//       }
//     })
//   </script>
//   ${story().outerHTML}
//   </div>`,
// ];
