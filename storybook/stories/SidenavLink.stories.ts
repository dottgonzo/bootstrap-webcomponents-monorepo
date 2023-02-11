import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/sidenav-link/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes as any, componentSetup.name);

export const SidenavLinkDefault = Template.bind({});

SidenavLinkDefault.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "default")
);

export const SidenavLinkWithPage = Template.bind({});

SidenavLinkWithPage.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "withPage")
);
export const SidenavLinkWithSelected = Template.bind({});

SidenavLinkWithSelected.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "selected")
);
