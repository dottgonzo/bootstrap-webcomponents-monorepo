import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/editor-tinymce/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes as any, componentSetup.name);

export const TinyEditorTemplate = Template.bind({});
TinyEditorTemplate.args = {
  id: "TinyEditorTemplate",
};

export const TinyEditorTemplateWithUploadUrl = Template.bind({});
TinyEditorTemplateWithUploadUrl.args = {
  id: "TinyEditorTemplateWithUploadUrl",
};
