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
} from "../../packages/offcanvas/extra/docs";

const innerHTML = `<button slot="test" onclick="document.getElementsByTagName('hb-offcanvas')[0].setAttribute('opened', 'yes')">test</button>`;
const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "Layout/Offcanvas",
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

export const BasicOffcanvas = {
  id: "BasicOffcanvas",
  navlinks: navlinks0,
};
export const BasicOffcanvasOpen = {
  opened: true,
  id: "BasicOffcanvasOpen",
  navlinks: navlinks0,
};
export const BasicOffcanvasOnSettings = {
  opened: true,
  id: "BasicOffcanvasOnSettings",
  navlinks: navlinks0,
  navpage: "settings",
};
export const BasicOffcanvasWithGroups = {
  opened: true,
  id: "BasicOffcanvasWithGroups",
  navlinks: navlinks1b,
  groups: groups1,
};
export const BasicOffcanvasWithGroupsOnSettings = {
  opened: true,
  id: "BasicOffcanvasWithGroupsOnSettings",
  navlinks: navlinks1,
  groups: groups1,
  navpage: "settings",
};
export const BasicOffcanvasWithAutoGroupsOnSettings = {
  opened: true,
  id: "BasicOffcanvasWithAutoGroupsOnSettings",
  navlinks: navlinks1,
  navpage: "settings",
};

export const BasicOffcanvasWithAutoGroupsOnSettingsAndBadge = {
  opened: true,
  id: "BasicOffcanvasWithAutoGroupsOnSettingsAndBadge",
  navlinks: navlinks2,
  navpage: "settings",
};
export const OffcanvasWithFooter = {
  opened: true,
  id: "OffcanvasWithFooter",
  navlinks: navlinks2,
  navpage: "settings",
  enablefooter: true,
};

export const OffcanvasWithFooterCustom = {
  opened: true,
  id: "OffcanvasWithFooterCustom",
  navlinks: navlinks2,
  navpage: "settings",
  enablefooter: true,
};

export const OffcanvasWithFooterCustomDesktop = {
  opened: true,
  id: "OffcanvasWithFooterCustomDesktop",
  navlinks: navlinks2,
  navpage: "settings",
  enablefooter: true,
  type: "open",
};
export const OffcanvasMultilevel = {
  opened: true,
  id: "OffcanvasMultilevel",
  navlinks: navlinks3,
  navpage: "settings",
  enablefooter: true,
  type: "open",
};
