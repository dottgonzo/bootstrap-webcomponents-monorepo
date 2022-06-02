import type { Story } from "@storybook/html";
import { webComponentBind, getStorybookMeta } from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/dropdown-simple/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const usermenu1 = {
  list: [
    {
      key: "list1",
      label: "list1",
    },
    {
      key: "list2",
      label: "list2",
    },
    {
      key: "list3",
      label: "list3",
      group: "list1",
      badge: "3",
    },
    {
      key: "list4",
      label: "list4",
      badge: "555",
    },
  ],
  imgUri:
    "https://upload.wikimedia.org/wikipedia/commons/8/80/Wikipedia-logo-v2.svg",
};

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, componentSetup.name);

export const BasicSimpleDropdown = Template.bind({});
BasicSimpleDropdown.args = {
  id: "BasicSimpleDropdown",
  list: [
    {
      key: "ciao",
      label: "bao",
    },
    {
      key: "ciao2",
      label: "bao2",
    },
    {
      key: "ciao3",
      label: "bao3",
      linkHref: "fefeef",
    },
  ],
};

export const BasicSimpleDropdownRight = Template.bind({});
BasicSimpleDropdownRight.args = {
  id: "BasicSimpleDropdownRight",
  list: [
    {
      key: "ciao",
      label: "bao",
    },
    {
      key: "ciao2",
      label: "bao2",
    },
    {
      key: "ciao3",
      label: "bao3",
      linkHref: "fefeef",
    },
  ],
};
