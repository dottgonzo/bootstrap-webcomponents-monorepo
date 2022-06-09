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
  webComponentBind(args, meta.argTypes as any, componentSetup.name);

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
export const LoginOnly = Template.bind({});

LoginOnly.args = setStorybookData(
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
