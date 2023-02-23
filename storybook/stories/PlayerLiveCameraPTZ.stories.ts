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
} from "../../packages/player-live-camera-ptz/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(
    args,
    meta.argTypes as any,
    componentSetup.repoName,
    lernaPkg.version
  );

export const PlayerLiveCameraPTZDefault = Template.bind({});

PlayerLiveCameraPTZDefault.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "default") ||
    (undefined as any)
);

export const PlayerLiveCameraPTZWithPresets = Template.bind({});

PlayerLiveCameraPTZWithPresets.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "withPresets") ||
    (undefined as any)
);
export const PlayerLiveCameraPTZWithPresetSelected = Template.bind({});

PlayerLiveCameraPTZWithPresetSelected.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "withPresetSelected") ||
    (undefined as any)
);
export const PlayerLiveCameraPTZWithPanelClosed = Template.bind({});

PlayerLiveCameraPTZWithPanelClosed.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "withPanelClosed") ||
    (undefined as any)
);
export const PlayerLiveCameraPTZDisconnected = Template.bind({});

PlayerLiveCameraPTZDisconnected.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "disconnected") ||
    (undefined as any)
);
