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
} from "../../packages/sidenav-link/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(
    args,
    meta.argTypes as any,
    componentSetup.repoName,
    version
  );

export const SidenavLinkDefault = Template.bind({});

SidenavLinkDefault.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "default") ||
    (undefined as any)
);

export const SidenavLinkWithPage = Template.bind({});

SidenavLinkWithPage.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "withPage") ||
    (undefined as any)
);
export const SidenavLinkWithSelected = Template.bind({});

SidenavLinkWithSelected.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "selected") ||
    (undefined as any)
);
