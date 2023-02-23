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
} from "../../packages/sidenav-button/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(
    args,
    meta.argTypes as any,
    componentSetup.repoName,
    lernaPkg.version
  );

export const SideNavButtonDefault = Template.bind({});

SideNavButtonDefault.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "default") ||
    (undefined as any)
);
export const SideNavButtonSelected = Template.bind({});

SideNavButtonSelected.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "selected") ||
    (undefined as any)
);
export const SideNavButtonSwitch = Template.bind({});

SideNavButtonSwitch.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "switch") || (undefined as any)
);
export const SideNavButtonCheckbox = Template.bind({});

SideNavButtonCheckbox.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "checkbox") ||
    (undefined as any)
);

export const SideNavButtonRadio = Template.bind({});

SideNavButtonRadio.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "radio") || (undefined as any)
);
