import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import lernaPkg from "../../lerna.json";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/sidebar-desktop/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args: any) =>
  webComponentBind(
    args,
    meta.argTypes as any,
    componentSetup.repoName,
    lernaPkg.version
  );

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

export const BasicSidebarDesktopDefault = Template.bind({});
BasicSidebarDesktopDefault.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "default") ||
    (undefined as any)
);

export const BasicSidebarOnSettings = Template.bind({});
BasicSidebarOnSettings.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "sidebarOnSettings") ||
    (undefined as any)
);

export const BasicSidebarWithGroups = Template.bind({});
BasicSidebarWithGroups.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "sidebarWithGroups") ||
    (undefined as any)
);

export const BasicSidebarWithGroupsOnSettings = Template.bind({});
BasicSidebarWithGroupsOnSettings.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find(
    (f) => f.name === "sidebarWithGroupsOnSettings"
  ) || (undefined as any)
);

export const BasicSidebarWithAutoGroupsOnSettings = Template.bind({});
BasicSidebarWithAutoGroupsOnSettings.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find(
    (f) => f.name === "sidebarWithAutoGroupsOnSettings"
  ) || (undefined as any)
);

export const BasicSidebarWithAutoGroupsOnSettingsAndBadge = Template.bind({});
BasicSidebarWithAutoGroupsOnSettingsAndBadge.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find(
    (f) => f.name === "sidebarWithAutoGroupsOnSettingsAndBadge"
  ) || (undefined as any)
);

export const BasicSidebarWithFooter = Template.bind({});
BasicSidebarWithFooter.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "sidebarWithFooter") ||
    (undefined as any)
);

export const BasicSidebarMultilevel = Template.bind({});
BasicSidebarMultilevel.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "sidebarMultilevel") ||
    (undefined as any)
);
