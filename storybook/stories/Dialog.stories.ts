import { Story, Meta } from "@storybook/html";
import {
  webComponentBind,
  argTypesExtraUtils,
} from "./utils/webComponentUtils";
import { storybookArgs } from "../../packages/dialog/extra/docs";

const meta: Meta = {
  title: "Components/Dialog",
  argTypes: Object.assign(argTypesExtraUtils, storybookArgs),
};
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, "dialog");

export const BasicBootstapModal = Template.bind({});
BasicBootstapModal.args = {
  id: "BasicBootstapModal",
  show: true,
};
