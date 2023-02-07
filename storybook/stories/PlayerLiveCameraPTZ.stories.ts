import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/player-live-camera-ptz/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes as any, componentSetup.name);

export const PlayerLiveCameraPTZDefault = Template.bind({});

PlayerLiveCameraPTZDefault.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "default")
);

export const PlayerLiveCameraPTZWithPresets = Template.bind({});

PlayerLiveCameraPTZWithPresets.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "withPresets")
);
export const PlayerLiveCameraPTZWithPresetSelected = Template.bind({});

PlayerLiveCameraPTZWithPresetSelected.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "withPresetSelected")
);
export const PlayerLiveCameraPTZWithPanelClosed = Template.bind({});

PlayerLiveCameraPTZWithPanelClosed.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "withPanelClosed")
);
export const PlayerLiveCameraPTZDisconnected = Template.bind({});

PlayerLiveCameraPTZDisconnected.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "disconnected")
);
