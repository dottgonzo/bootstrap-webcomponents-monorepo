import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import { version } from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/auth/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(
    args,
    meta.argTypes as any,
    componentSetup.repoName,
    version
  );

export const Login = Template.bind({});

Login.args = setStorybookData(componentSetup.name, componentSetup.examples[0]);

export const Register = Template.bind({});

Register.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[1]
);
export const LoginWithActivation = Template.bind({});

LoginWithActivation.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[2]
);

export const LoginWithRecover = Template.bind({});

LoginWithRecover.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[3]
);

export const LoginEn = Template.bind({});

LoginEn.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[4]
);
export const LoginOnlyItalian = Template.bind({});

LoginOnlyItalian.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[5]
);
export const LoginEnWithFetch = Template.bind({});

LoginEnWithFetch.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[6]
);
export const LoginEnWithOauth = Template.bind({});

LoginEnWithOauth.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[7]
);
export const LoginEnWithOauthOnly = Template.bind({});

LoginEnWithOauthOnly.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[8]
);

export const ForgetPassword = Template.bind({});

ForgetPassword.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[9]
);
export const EmailInstructionSide = Template.bind({});

EmailInstructionSide.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[10]
);
