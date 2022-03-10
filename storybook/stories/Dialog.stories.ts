import { Story, Meta } from "@storybook/html";
import {
  webComponentBind,
  argTypesExtraUtils,
} from "./utils/webComponentUtils";
import { storybookArgs } from "../../packages/dialog/extra/docs";

const copy1 = Object.assign({}, argTypesExtraUtils);
const copy2 = Object.assign({}, storybookArgs);

const assigned = Object.assign({}, copy1, copy2);
const meta: Meta = {
  title: "Components/Dialog",
  argTypes: assigned,
};
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, "dialog");

export const BasicBootstapModal = Template.bind({});
BasicBootstapModal.args = {
  id: "BasicBootstapModal",
  show: true,
};
