import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/site-contacts-row/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes as any, componentSetup.repoName);

export const SiteContactsBig = Template.bind({});
SiteContactsBig.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[0]
);
export const SiteContactsSmall = Template.bind({});
SiteContactsSmall.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[1]
);
export const SiteContacts = Template.bind({});
SiteContacts.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[2]
);
export const SiteContactsAuto2 = Template.bind({});
SiteContactsAuto2.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[3]
);
export const SiteContactsAuto3 = Template.bind({});
SiteContactsAuto3.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[4]
);
export const SiteContactsAuto4 = Template.bind({});
SiteContactsAuto4.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[5]
);
export const SiteContactsAuto1 = Template.bind({});
SiteContactsAuto1.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[6]
);
export const SiteContactsBig2 = Template.bind({});
SiteContactsBig2.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[7]
);
export const SiteContactsBig3 = Template.bind({});
SiteContactsBig3.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[8]
);
export const SiteContactsBig4 = Template.bind({});
SiteContactsBig4.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[9]
);
export const SiteContactsBig1 = Template.bind({});
SiteContactsBig1.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[10]
);
