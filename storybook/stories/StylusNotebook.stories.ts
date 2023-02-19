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
} from "../../packages/stylus-notebook/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(
    args,
    meta.argTypes as any,
    componentSetup.repoName,
    version
  );

export const Main = Template.bind({});
Main.args = setStorybookData(componentSetup.name, componentSetup.examples[0]);

export const WithLoadDraw = Template.bind({});
WithLoadDraw.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[1]
);
