import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/auth-social-login-button/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "components/authsocialloginbutton",
  tags: ["autodocs"],

  parameters: meta.parameters,

  argTypes: meta.argTypes,
  render: ({ label, ...args }) => {
    return webComponentBind(
      args,
      meta.argTypes,
      componentSetup.repoName,
      lernaPkg.version
    );
  },
};

export const authsocialloginbutton0 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const authsocialloginbutton1 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

export const authsocialloginbutton2 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[2]),
};

export const authsocialloginbutton3 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[3]),
};

