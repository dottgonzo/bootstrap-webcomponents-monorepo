import "./main.css";
import type { Meta } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import lernaPkg from "../../lerna.json";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/dropdown-notifications/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "Components/DropdownNotifications",
  tags: ["autodocs"],

  parameters: meta.parameters,

  argTypes: meta.argTypes,
  render: ({ label, ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    // @ts-ignore
    return webComponentBind(
      args,
      meta.argTypes,
      componentSetup.repoName,
      lernaPkg.version
    );
  },
};

export const DropdownNotifications1 = {
  args: {
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
  },
};

export const DropdownNotifications2 = {
  args: {
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
  },
};
