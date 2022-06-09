import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "./utils/webComponentUtils";
import { storybookArgs, componentSetup } from "../../packages/gauge/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes as any, componentSetup.name);

export const GaugesTemplate = Template.bind({});
GaugesTemplate.args = {
  id: "GaugesTemplate",
  options: {
    value: 50,
    min: 0,
    max: 100,
  },
};
