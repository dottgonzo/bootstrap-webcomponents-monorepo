import type { Story } from "@storybook/html";
import { webComponentBind, getStorybookMeta } from "./utils/webComponentUtils";
import { storybookArgs, componentSetup } from "../../packages/auth/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, componentSetup.name);

export const Login = Template.bind({});
Login.args = {
  type: "login",
  logouri:
    "https://upload.wikimedia.org/wikipedia/commons/a/af/Free_Content_Logo.svg",
  id: "login",
};

export const Register = Template.bind({});
Register.args = {
  type: "register",
  logouri:
    "https://upload.wikimedia.org/wikipedia/commons/a/af/Free_Content_Logo.svg",
  id: "Register",
};

export const LoginWithActivation = Template.bind({});
LoginWithActivation.args = {
  type: "activate",
  recoverycode: "testcode",
  logouri:
    "https://upload.wikimedia.org/wikipedia/commons/a/af/Free_Content_Logo.svg",
  id: "LoginWithActivation",
};
export const LoginWithRecover = Template.bind({});
LoginWithRecover.args = {
  type: "recover",
  logouri:
    "https://upload.wikimedia.org/wikipedia/commons/a/af/Free_Content_Logo.svg",
  id: "LoginWithRecover",
};

export const LoginEn = Template.bind({});
LoginEn.args = {
  type: "login",
  language: "en",
  id: "LoginEn",
};
export const LoginOnly = Template.bind({});
LoginOnly.args = {
  type: "login",
  language: "en",
  id: "LoginOnly",
  disableregister: true,
};
export const LoginEnWithFetch = Template.bind({});
LoginEnWithFetch.args = {
  type: "login",
  language: "en",
  loginuri: "https://kernel.free.beeceptor.com/login",
  registeruri: "https://kernel.free.beeceptor.com/register",
  id: "LoginEnWithFetch",
};
export const LoginEnWithOauth = Template.bind({});
LoginEnWithOauth.args = {
  type: "login",
  language: "en",
  loginuri: "https://kernel.free.beeceptor.com/login",
  registeruri: "https://kernel.free.beeceptor.com/register",
  oauth2providers: [
    {
      provider: "google",
      uri: "https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly&include_granted_scopes=true&response_type=token&state=state_parameter_passthrough_value&redirect_uri=https%3A//oauth2.example.com/code&client_id=client_id",
    },
    { provider: "facebook" },
    { provider: "twitter" },
  ],
  id: "LoginEnWithOauth",
};
