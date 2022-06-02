import { Story, Meta } from "@storybook/html";
import {
  webComponentBind,
  argTypesExtraUtils,
  toPascalCase,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/dropdown-simple/extra/docs";

const copy1 = Object.assign({}, argTypesExtraUtils);
const copy2 = Object.assign({}, storybookArgs);

const assigned = Object.assign({}, copy1, copy2);
const meta: Meta = {
  title:
    componentSetup.category +
    "/" +
    toPascalCase(componentSetup.name.replace("hb-", "")),
  argTypes: assigned,
};

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
