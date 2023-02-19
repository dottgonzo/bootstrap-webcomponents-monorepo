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
} from "../../packages/paragraps-around-image/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(
    args,
    meta.argTypes as any,
    componentSetup.repoName,
    version
  );

export const ParagraphsAImg2 = Template.bind({});
ParagraphsAImg2.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[0]
);
export const ParagraphsAImg4 = Template.bind({});
ParagraphsAImg4.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[1]
);
export const ParagraphsAImg6 = Template.bind({});
ParagraphsAImg6.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[2]
);
