import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/input-captcha-google-v2/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, componentSetup.name);

export const FormReCaptchaV2 = Template.bind({});
FormReCaptchaV2.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[0]
);
