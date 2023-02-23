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
} from "../../packages/area-code/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(
    args,
    meta.argTypes as any,
    componentSetup.repoName,
    lernaPkg.version
  );

export const AreaCode = Template.bind({});
AreaCode.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[0]
);

export const AreaCodeLongText = Template.bind({});
AreaCodeLongText.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[1]
);
