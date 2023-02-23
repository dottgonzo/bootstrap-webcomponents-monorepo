import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import lernaPkg from "../../lerna.json";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/input-color/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const inputEntry1 = {
  placeholder: "Insert color...",
  id: "color1",
  required: true,
  label: "Last color",
  validationTip: "This field cannot be empty.",
  value: "#ffffff",
};

const Template: Story = (args) =>
  webComponentBind(
    args,
    meta.argTypes as any,
    componentSetup.repoName,
    lernaPkg.version
  );

export const FormColorInputTemplate = Template.bind({});
FormColorInputTemplate.args = {
  id: "BasicFormColorInput",
  schemaentry: inputEntry1,
};
