import { Story, Meta } from "@storybook/html";
import {
  webComponentBind,
  argTypesExtraUtils,
} from "./utils/webComponentUtils";
import { storybookArgs } from "../../packages/editor-tinymce/extra/docs";

const meta: Meta = {
  title: "Contents/TinyEditor",
  argTypes: Object.assign(argTypesExtraUtils, storybookArgs),
};

export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, "editor-tinymce");

export const TinyEditorTemplate = Template.bind({});
TinyEditorTemplate.args = {
  id: "TinyEditorTemplate",
};

export const TinyEditorTemplateWithUploadUrl = Template.bind({});
TinyEditorTemplateWithUploadUrl.args = {
  id: "TinyEditorTemplateWithUploadUrl",
};
