import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/calendar-appointments/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes as any, componentSetup.repoName);

export const BasicAppointments = Template.bind({});

BasicAppointments.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[0]
);

export const EmptyAppointments = Template.bind({});

EmptyAppointments.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[1]
);
