import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/calendar-events/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "components/calendarevents",
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

export const calendarevents0 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[0]),
};

export const calendarevents1 = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[1]),
};

