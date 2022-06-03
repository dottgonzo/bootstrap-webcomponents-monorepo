import type { Story } from "@storybook/html";
import { webComponentBind, getStorybookMeta } from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/layout-desktop/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;
const company1 = {
  logoUri:
    "https://upload.wikimedia.org/wikipedia/commons/8/80/Wikipedia-logo-v2.svg",
  siteName: "testsite",
  companyName: "testcompany S.R.L.",
  registration: "copyright",
  description: `testo e descrizione di esempio dell'applicazione`,
  vatNumber: "aa - ffffff",
  fiscalCode: "f4f5f6fff",
};

const navlinks2 = [
  {
    label: "Home",
    key: "home",
    icon: "house-door",
    badge: {
      text: "bbb",
    },
  },
  {
    label: "Dashboard",
    key: "dashboard",
    icon: "speedometer",
    badge: {
      text: "bbb",
    },
  },
  {
    label: "Settings",
    key: "settings",
    icon: "gear",
    group: "admin",
    badge: {
      text: "bbb",
    },
  },
  {
    label: "Users",
    key: "users",
    icon: "people-fill",
    group: "admin",
    badge: {
      text: "uuuuu",
    },
  },
  {
    label: "Stats",
    key: "stats",
    icon: "graph-up",
    group: "stats",
    badge: {
      text: "bbb",
    },
  },
];
const navlinksMany = [
  {
    label: "Home",
    key: "home",
    icon: "house-door",
    badge: {
      text: "bbb",
    },
  },
  {
    label: "Dashboard",
    key: "dashboard",
    icon: "speedometer",
    badge: {
      text: "bbb",
    },
  },
  {
    label: "Settings",
    key: "settings",
    icon: "gear",
    group: "admin",
    badge: {
      text: "bbb",
    },
  },
  {
    label: "Users",
    key: "users",
    icon: "people-fill",
    group: "admin",
    badge: {
      text: "uuuuu",
    },
  },
  {
    label: "Stats",
    key: "stats",
    icon: "graph-up",
    group: "stats",
    badge: {
      text: "bbb",
    },
  },

  {
    label: "Stats1",
    key: "stats1",
    icon: "graph-up",
    group: "stats",
    badge: {
      text: "bbb",
    },
  },

  {
    label: "Stats2",
    key: "stats2",
    icon: "graph-up",
    group: "stats",
    badge: {
      text: "bbb",
    },
  },

  {
    label: "Stats3",
    key: "stats3",
    icon: "graph-up",
    group: "stats",
    badge: {
      text: "bbb",
    },
  },

  {
    label: "Stats4",
    key: "stats4",
    icon: "graph-up",
    group: "stats",
    badge: {
      text: "bbb",
    },
  },

  {
    label: "Stats5",
    key: "stats5",
    icon: "graph-up",
    group: "stats",
    badge: {
      text: "bbb",
    },
  },

  {
    label: "Stats",
    key: "stats",
    icon: "graph-up",
    group: "stats",
    badge: {
      text: "bbb",
    },
  },

  {
    label: "Stats",
    key: "stats",
    icon: "graph-up",
    group: "stats",
    badge: {
      text: "bbb",
    },
  },

  {
    label: "Stats4",
    key: "stats4",
    icon: "graph-up",
    group: "stats",
    badge: {
      text: "bbb",
    },
  },

  {
    label: "Stats5",
    key: "stats5",
    icon: "graph-up",
    group: "stats",
    badge: {
      text: "bbb",
    },
  },

  {
    label: "Stats6",
    key: "stats6",
    icon: "graph-up",
    group: "stats",
    badge: {
      text: "bbb",
    },
  },

  {
    label: "Stats7",
    key: "stats7",
    icon: "graph-up",
    group: "stats",
    badge: {
      text: "bbb",
    },
  },
];

const contacts1 = {
  sites: [
    {
      label: "dariocaruso.info",
      uri: "https://dariocaruso.info",
    },
  ],
  phones: [
    {
      number: "6666666666666",
    },
  ],
  addresses: [],
  emails: [],
};
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
const socials1 = {
  facebook: "fbbb",
  youtube: "yttttttt",
};
const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, componentSetup.name);

export const LayoutA = Template.bind({});
LayoutA.args = {
  id: "LayoutA",
  company: company1,
  contacts: contacts1,
  socials: socials1,
  navlinks: navlinks2,
  usermenu: usermenu1,
  sidebar: { title: "brand" },
};

export const LayoutWithBigSidebar = Template.bind({});
LayoutWithBigSidebar.args = {
  id: "LayoutWithBigSidebar",
  company: company1,
  contacts: contacts1,
  socials: socials1,
  navlinks: navlinksMany,
  usermenu: usermenu1,
  sidebar: { title: "brand" },
};
export const LayoutWithBigSidebarAndBigText = Template.bind({});
LayoutWithBigSidebarAndBigText.args = {
  id: "LayoutWithBigSidebarAndBigText",
  company: company1,
  contacts: contacts1,
  socials: socials1,
  navlinks: navlinksMany,
  usermenu: usermenu1,
  sidebar: { title: "brand" },
  _testInnerHtml:
    '<div slot="page">paddddddddddddddddddddddddddddddddddddddddddge<br/>\
    ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>\
    ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao\
    <br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>\
    ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao\
    <br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>\
    ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao<br/>ciao</div>',
};
export const LayoutAWithPage = Template.bind({});
LayoutAWithPage.args = {
  id: "LayoutAWithPage",
  company: company1,
  contacts: contacts1,
  socials: socials1,
  navlinks: navlinks2,
  pagename: "settings",
  usermenu: usermenu1,
  cookielaw: "yes",
  _testInnerHtml:
    '<div slot="page">paddddddddddddddddddddddddddddddddddddddddddge</div><div slot="nav-right-slot">rghtslot</div>',
};
export const LayoutAWithoutBurger = Template.bind({});
LayoutAWithoutBurger.args = {
  id: "LayoutAWithoutBurger",
  company: company1,
  contacts: contacts1,
  socials: socials1,
  pagename: "settings",
  usermenu: usermenu1,
  cookielaw: "yes",
};
export const LayoutAWithoutNavSlotted = Template.bind({});
LayoutAWithoutNavSlotted.args = {
  id: "LayoutAWithoutNavSlotted",
  company: company1,
  contacts: contacts1,
  socials: socials1,
  pagename: "settings",
  usermenu: usermenu1,
  cookielaw: "yes",
  _testInnerHtml: '<div slot="nav-right-slot">right-</div>',
};
