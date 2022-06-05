import type { Story } from "@storybook/html";
import { webComponentBind, getStorybookMeta } from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/area-code/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, componentSetup.name);

export const AreaCode = Template.bind({});
AreaCode.args = Object.assign(
  {
    id: "AreaCode",
  },
  componentSetup.examples[0].data
);

export const AreaCodeLongText = Template.bind({});

AreaCodeLongText.args = Object.assign(
  {
    id: "AreaCodeLongText",
  },
  componentSetup.examples[1].data
);
