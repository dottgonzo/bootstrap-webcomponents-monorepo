import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/calendar-appointments/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "components/calendarappointments",
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

export const calendarappointments0 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const calendarappointments1 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

