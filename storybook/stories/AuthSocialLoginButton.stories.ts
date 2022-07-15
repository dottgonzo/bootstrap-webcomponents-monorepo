import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "./utils/webComponentUtils";
import { storybookArgs, componentSetup } from "../../packages/auth-social-login-button/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes as any, componentSetup.name);

export const LoginFacebook = Template.bind({});

LoginFacebook.args = setStorybookData(componentSetup.name, componentSetup.examples[0]);

export const LoginGitlab = Template.bind({});

LoginGitlab.args = setStorybookData(componentSetup.name, componentSetup.examples[1]);

export const LoginGithub = Template.bind({});

LoginGithub.args = setStorybookData(componentSetup.name, componentSetup.examples[2]);

export const LoginGoogle = Template.bind({});

LoginGoogle.args = setStorybookData(componentSetup.name, componentSetup.examples[3]);
