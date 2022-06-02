import { Story, Meta } from "@storybook/html";
import {
  webComponentBind,
  argTypesExtraUtils,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/dropdown-notifications/extra/docs";

const copy1 = Object.assign({}, argTypesExtraUtils);
const copy2 = Object.assign({}, storybookArgs);

const assigned = Object.assign({}, copy1, copy2);
const meta: Meta = {
  title: componentSetup.category + "/DropdownNotifications",
  argTypes: assigned,
};

export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, componentSetup.name);

export const DropdownNotifications1 = Template.bind({});
DropdownNotifications1.args = {
  id: "DropdownNotifications1",
  _testInnerHtml: `<hb-notification-item avatar="LI" url="https://example.com/1">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    <span slot="ext">30 min ago</span>
  </hb-notification-item>
  <hb-notification-item avatar="https://picsum.photos/10/10">Etiam quis lacus nec massa pulvinar aliquet.
  </hb-notification-item>
  <hb-notification-item url="https://example.com/3">Fusce in lectus posuere, interdum risus id, convallis est.
    <span slot="ext">30 min ago</span>
  </hb-notification-item>
  <hb-notification-item url="https://example.com/4">Donec in mi ac nulla sagittis vestibulum ut hendrerit nisi.
  </hb-notification-item>
  <hb-notification-item avatar="NN">Nam non ligula at nibh tristique euismod.<span slot="ext">30 min
  ago</span>
  </hb-notification-item>
  <hb-notification-item avatar="https://picsum.photos/200/100" url="https://example.com/6">Ut aliquam sapien non eros facilisis feugiat.
  </hb-notification-item>`,
  clearurl: "https://example.com",
  viewurl: "https://example.org",
};

export const DropdownNotifications2 = Template.bind({});
DropdownNotifications2.args = {
  id: "DropdownNotifications2",
  _testInnerHtml: `<hb-notification-item avatar="LI" url="https://example.com/1">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    <span slot="ext">30 min ago</span>
  </hb-notification-item>
  <hb-notification-item avatar="https://picsum.photos/10/10">Etiam quis lacus nec massa pulvinar aliquet.
  </hb-notification-item>
  <hb-notification-item url="https://example.com/3">Fusce in lectus posuere, interdum risus id, convallis est.
    <span slot="ext">30 min ago</span>
  </hb-notification-item>
  <hb-notification-item url="https://example.com/4">Donec in mi ac nulla sagittis vestibulum ut hendrerit nisi.
  </hb-notification-item>
  <hb-notification-item avatar="NN">Nam non ligula at nibh tristique euismod.<span slot="ext">30 min
  ago</span>
  </hb-notification-item>
  <hb-notification-item avatar="https://picsum.photos/200/100" url="https://example.com/6">Ut aliquam sapien non eros facilisis feugiat.
  </hb-notification-item>`,
};
