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
} from "../../packages/cookie-law-banner/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(
    args,
    meta.argTypes as any,
    componentSetup.repoName,
    version
  );

export const CookielawSimple = Template.bind({});
CookielawSimple.args = {
  id: "CookielawSimple",
};
export const CookielawWithDecline = Template.bind({});
CookielawWithDecline.args = {
  id: "CookielawWithDecline",
  allowdecline: true,
};
export const CookielawEn = Template.bind({});
CookielawEn.args = {
  id: "CookielawEn",
  i18nlang: "en",
};
export const CookielawIt = Template.bind({});
CookielawIt.args = {
  id: "CookielawIt",
  i18nlang: "it",
};
