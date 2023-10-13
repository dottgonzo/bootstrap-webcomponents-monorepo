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
} from "../../packages/sidebar-desktop/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "Layout/SidebarDesktop",
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

export const BasicSidebarDesktopDefault = {
  args: {
    args: setStorybookData(
      componentSetup.name,
      componentSetup.examples.find((f) => f.name === "default") ||
        (undefined as any)
    ),
  },
};

export const BasicSidebarOnSettings = {
  args: {
    args: setStorybookData(
      componentSetup.name,
      componentSetup.examples.find((f) => f.name === "sidebarOnSettings") ||
        (undefined as any)
    ),
  },
};

export const BasicSidebarWithGroups = {
  args: {
    args: setStorybookData(
      componentSetup.name,
      componentSetup.examples.find((f) => f.name === "sidebarWithGroups") ||
        (undefined as any)
    ),
  },
};

export const BasicSidebarWithGroupsOnSettings = {
  args: {
    args: setStorybookData(
      componentSetup.name,
      componentSetup.examples.find(
        (f) => f.name === "sidebarWithGroupsOnSettings"
      ) || (undefined as any)
    ),
  },
};

export const BasicSidebarWithAutoGroupsOnSettings = {
  args: {
    args: setStorybookData(
      componentSetup.name,
      componentSetup.examples.find(
        (f) => f.name === "sidebarWithAutoGroupsOnSettings"
      ) || (undefined as any)
    ),
  },
};

export const BasicSidebarWithAutoGroupsOnSettingsAndBadge = {
  args: {
    args: setStorybookData(
      componentSetup.name,
      componentSetup.examples.find(
        (f) => f.name === "sidebarWithAutoGroupsOnSettingsAndBadge"
      ) || (undefined as any)
    ),
  },
};

export const BasicSidebarWithFooter = {
  args: {
    args: setStorybookData(
      componentSetup.name,
      componentSetup.examples.find((f) => f.name === "sidebarWithFooter") ||
        (undefined as any)
    ),
  },
};

export const BasicSidebarMultilevel = {
  args: {
    args: setStorybookData(
      componentSetup.name,
      componentSetup.examples.find((f) => f.name === "sidebarMultilevel") ||
        (undefined as any)
    ),
  },
};
