import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/terms-doc-templates/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes as any, componentSetup.name);

export const TermDoc1 = Template.bind({});
TermDoc1.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[0]
);
export const TermDocItalian = Template.bind({});
TermDocItalian.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[1]
);
