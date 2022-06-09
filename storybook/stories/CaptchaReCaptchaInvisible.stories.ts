import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/captcha-google-recaptcha-v2-invisible/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes as any, componentSetup.name);

export const FormReCaptchaV2 = Template.bind({});
FormReCaptchaV2.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[0]
);
