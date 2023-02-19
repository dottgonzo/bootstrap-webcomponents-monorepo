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
} from "../../packages/sidebar-cards-navigator/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(
    args,
    meta.argTypes as any,
    componentSetup.repoName,
    version
  );

export const SidebarCardsNavigator = Template.bind({});

SidebarCardsNavigator.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "default") ||
    (undefined as any)
);
export const SidebarCardsNavigatorEmpty = Template.bind({});

SidebarCardsNavigatorEmpty.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "empty") || (undefined as any)
);
