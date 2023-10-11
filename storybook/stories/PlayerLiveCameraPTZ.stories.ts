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
} from "../../packages/player-live-camera-ptz/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "Players/PlayerLiveCameraPTZ",
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

export const PlayerLiveCameraPTZDefault = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "default") ||
    (undefined as any)
);

export const PlayerLiveCameraPTZWithPresets = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "withPresets") ||
    (undefined as any)
);
export const PlayerLiveCameraPTZWithPresetSelected = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "withPresetSelected") ||
    (undefined as any)
);
export const PlayerLiveCameraPTZWithPanelClosed = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "withPanelClosed") ||
    (undefined as any)
);
export const PlayerLiveCameraPTZDisconnected = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "disconnected") ||
    (undefined as any)
);
