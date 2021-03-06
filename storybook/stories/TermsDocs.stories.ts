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

export const PrivacyDocItalian1 = Template.bind({});
PrivacyDocItalian1.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[0]
);
export const CookieDocItalian1 = Template.bind({});
CookieDocItalian1.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[1]
);
export const CookieDocEn1 = Template.bind({});
CookieDocEn1.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[2]
);
export const CookieDocEnEmpty = Template.bind({});
CookieDocEnEmpty.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[3]
);
