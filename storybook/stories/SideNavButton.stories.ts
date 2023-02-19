import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/sidenav-button/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes as any, componentSetup.repoName);

export const SideNavButtonDefault = Template.bind({});

SideNavButtonDefault.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "default")
);
export const SideNavButtonSelected = Template.bind({});

SideNavButtonSelected.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "selected")
);
export const SideNavButtonSwitch = Template.bind({});

SideNavButtonSwitch.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "switch")
);
export const SideNavButtonCheckbox = Template.bind({});

SideNavButtonCheckbox.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "checkbox")
);

export const SideNavButtonRadio = Template.bind({});

SideNavButtonRadio.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "radio")
);
