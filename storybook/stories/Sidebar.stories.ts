import { Story, Meta } from "@storybook/html";
import {
  webComponentBind,
  argTypesExtraUtils,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/sidebar-desktop/extra/docs";

const copy1 = Object.assign({}, argTypesExtraUtils);
const copy2 = Object.assign({}, storybookArgs);

const assigned = Object.assign({}, copy1, copy2);
const meta: Meta = {
  title: componentSetup.category + "/SidebarDesktop",
  argTypes: assigned,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

const Template: Story = (args: any) =>
  webComponentBind(args, meta.argTypes, componentSetup.name);

const navlinks1b = [
  {
    label: "Settings",
    key: "settings",
    icon: "gear",
    group: "admin",
  },
  {
    label: "Users",
    key: "users",
    icon: "people-fill",
    group: "admin",
  },
  {
    label: "Stats",
    key: "stats",
    icon: "graph-up",
    group: "stats",
  },
];
const navlinks1 = [
  {
    label: "Home",
    key: "home",
    icon: "house-door",
  },
  {
    label: "Dashboard",
    key: "dashboard",
    icon: "speedometer",
  },
  {
    label: "Settings",
    key: "settings",
    icon: "gear",
    group: "admin",
  },
  {
    label: "Users",
    key: "users",
    icon: "people-fill",
    group: "admin",
  },
  {
    label: "Stats",
    key: "stats",
    icon: "graph-up",
    group: "stats",
  },
];
const navlinks3 = [
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
    label: "Settingsss",
    key: "settingsss",
    icon: "gear",
    group: "admin",
    subLinks: [
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
    ],
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
const navlinks0 = [
  {
    label: "Home",
    key: "home",
    icon: "house-door",
  },
  {
    label: "Dashboard",
    key: "dashboard",
    icon: "speedometer",
  },
  {
    label: "Settings",
    key: "settings",
    icon: "gear",
  },
  {
    label: "Users",
    key: "users",
    icon: "people-fill",
  },
  {
    label: "Stats",
    key: "stats",
    icon: "graph-up",
  },
];

const groups1 = [
  {
    key: "stats",
    label: "statistiche",
  },
  {
    key: "admin",
    label: "amministrazione",
  },
];

export const BasicSidebarDesktop = Template.bind({});
BasicSidebarDesktop.args = {
  id: "BasicSidebarDesktop",
  navlinks: navlinks0,
};
export const BasicSidebarDesktopOpen = Template.bind({});
BasicSidebarDesktopOpen.args = {
  opened: true,
  id: "BasicSidebarDesktopOpen",
  navlinks: navlinks0,
};
export const BasicSidebarDesktopOnSettings = Template.bind({});
BasicSidebarDesktopOnSettings.args = {
  opened: true,
  id: "BasicSidebarDesktopOnSettings",
  navlinks: navlinks0,
  navpage: "settings",
};
export const BasicSidebarDesktopWithGroups = Template.bind({});
BasicSidebarDesktopWithGroups.args = {
  opened: true,
  id: "BasicSidebarDesktopWithGroups",
  navlinks: navlinks1b,
  groups: groups1,
};
export const BasicSidebarDesktopWithGroupsOnSettings = Template.bind({});
BasicSidebarDesktopWithGroupsOnSettings.args = {
  opened: true,
  id: "BasicSidebarDesktopWithGroupsOnSettings",
  navlinks: navlinks1,
  groups: groups1,
  navpage: "settings",
};
export const BasicSidebarDesktopWithAutoGroupsOnSettings = Template.bind({});
BasicSidebarDesktopWithAutoGroupsOnSettings.args = {
  opened: true,
  id: "BasicSidebarDesktopWithAutoGroupsOnSettings",
  navlinks: navlinks1,
  navpage: "settings",
};

export const BasicSidebarDesktopWithAutoGroupsOnSettingsAndBadge =
  Template.bind({});
BasicSidebarDesktopWithAutoGroupsOnSettingsAndBadge.args = {
  opened: true,
  id: "BasicSidebarDesktopWithAutoGroupsOnSettingsAndBadge",
  navlinks: navlinks2,
  navpage: "settings",
};
export const SidebarDesktopWithFooter = Template.bind({});
SidebarDesktopWithFooter.args = {
  opened: true,
  id: "SidebarDesktopWithFooter",
  navlinks: navlinks2,
  navpage: "settings",
  enablefooter: true,
};

export const SidebarDesktopWithFooterCustom = Template.bind({});
SidebarDesktopWithFooterCustom.args = {
  opened: true,
  id: "SidebarDesktopWithFooterCustom",
  navlinks: navlinks2,
  navpage: "settings",
  enablefooter: true,
};

export const SidebarDesktopWithFooterCustomDesktop = Template.bind({});
SidebarDesktopWithFooterCustomDesktop.args = {
  opened: true,
  id: "SidebarDesktopWithFooterCustomDesktop",
  navlinks: navlinks2,
  navpage: "settings",
  enablefooter: true,
  type: "open",
};
export const SidebarDesktopMultilevel = Template.bind({});
SidebarDesktopMultilevel.args = {
  opened: true,
  id: "SidebarDesktopMultilevel",
  navlinks: navlinks3,
  navpage: "settings",
  enablefooter: true,
  type: "open",
};
