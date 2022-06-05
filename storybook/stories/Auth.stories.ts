import type { Story } from "@storybook/html";
import { webComponentBind, getStorybookMeta } from "./utils/webComponentUtils";
import { storybookArgs, componentSetup } from "../../packages/auth/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, componentSetup.name);

export const Login = Template.bind({});

Login.args = Object.assign(
  {
    id: "login",
  },
  componentSetup.examples[0].data
);
export const Register = Template.bind({});

Register.args = Object.assign(
  {
    id: "register",
  },
  componentSetup.examples[1].data
);
export const LoginWithActivation = Template.bind({});

LoginWithActivation.args = Object.assign(
  {
    id: "LoginWithActivation",
  },
  componentSetup.examples[2].data
);

export const LoginWithRecover = Template.bind({});

LoginWithRecover.args = Object.assign(
  {
    id: "LoginWithRecover",
  },
  componentSetup.examples[3].data
);
export const LoginEn = Template.bind({});

LoginEn.args = Object.assign(
  {
    id: "LoginEn",
  },
  componentSetup.examples[4].data
);
export const LoginOnly = Template.bind({});

LoginOnly.args = Object.assign(
  {
    id: "LoginOnly",
  },
  componentSetup.examples[5].data
);
export const LoginEnWithFetch = Template.bind({});

LoginEnWithFetch.args = Object.assign(
  {
    id: "LoginEnWithFetch",
  },
  componentSetup.examples[6].data
);
export const LoginEnWithOauth = Template.bind({});

LoginEnWithOauth.args = Object.assign(
  {
    id: "LoginEnWithOauth",
  },
  componentSetup.examples[7].data
);
