import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/area-code/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, componentSetup.name);

export const AreaCode = Template.bind({});
AreaCode.args = setStorybookData(componentSetup, 0);

export const AreaCodeLongText = Template.bind({});
AreaCodeLongText.args = setStorybookData(componentSetup, 1);
