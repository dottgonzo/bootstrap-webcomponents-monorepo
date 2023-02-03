import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/pad-joistick/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes as any, componentSetup.name);

export const PadJoistickDefault = Template.bind({});

PadJoistickDefault.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "default")
);
export const PadJoistickJoystick = Template.bind({});

PadJoistickJoystick.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "joystick")
);
