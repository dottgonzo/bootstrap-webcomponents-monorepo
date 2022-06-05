import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "./utils/webComponentUtils";
import { storybookArgs, componentSetup } from "../../packages/auth/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, componentSetup.name);

export const Login = Template.bind({});

Login.args = setStorybookData(componentSetup, 0);

export const Register = Template.bind({});

Register.args = setStorybookData(componentSetup, 1);
export const LoginWithActivation = Template.bind({});

LoginWithActivation.args = setStorybookData(componentSetup, 2);

export const LoginWithRecover = Template.bind({});

LoginWithRecover.args = setStorybookData(componentSetup, 3);

export const LoginEn = Template.bind({});

LoginEn.args = setStorybookData(componentSetup, 4);
export const LoginOnly = Template.bind({});

LoginOnly.args = setStorybookData(componentSetup, 5);
export const LoginEnWithFetch = Template.bind({});

LoginEnWithFetch.args = setStorybookData(componentSetup, 6);
export const LoginEnWithOauth = Template.bind({});

LoginEnWithOauth.args = setStorybookData(componentSetup, 7);
