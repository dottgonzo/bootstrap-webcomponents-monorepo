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
} from "../../packages/player-live/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "Players/PlayerLive",
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

export const LiveVideoPlayer = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "default") ||
    (undefined as any)
);
export const LiveVideoPlayerWithWidth = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "LiveVideoPlayerWithWidth") ||
    (undefined as any)
);
export const LiveVideoPlayerWithHeight = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "LiveVideoPlayerWithHeight") ||
    (undefined as any)
);
export const LiveVideoPlayerWithoutUri = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "LiveVideoPlayerWithoutUri") ||
    (undefined as any)
);

export const LiveVideoPlayerWithText3 = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "LiveVideoPlayerWithText3") ||
    (undefined as any)
);

export const LiveVideoPlayerWithText2 = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "LiveVideoPlayerWithText2") ||
    (undefined as any)
);

export const LiveVideoPlayerWithText1 = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "LiveVideoPlayerWithText1") ||
    (undefined as any)
);
