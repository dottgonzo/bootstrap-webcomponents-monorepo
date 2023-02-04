import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/pad-joystick/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes as any, componentSetup.name);

export const PadJoystickDefault = Template.bind({});

PadJoystickDefault.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "default")
);
export const PadJoystickJoystick = Template.bind({});

PadJoystickJoystick.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "joystick")
);
