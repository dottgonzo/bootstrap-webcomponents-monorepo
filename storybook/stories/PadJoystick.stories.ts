import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import { version } from "../../lerna.json";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/pad-joystick/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(
    args,
    meta.argTypes as any,
    componentSetup.repoName,
    version
  );

export const PadJoystickDefault = Template.bind({});

PadJoystickDefault.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "default") ||
    (undefined as any)
);
export const PadJoystickJoystick = Template.bind({});

PadJoystickJoystick.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "joystick") ||
    (undefined as any)
);
