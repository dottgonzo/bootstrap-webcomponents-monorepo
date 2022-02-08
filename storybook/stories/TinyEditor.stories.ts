import { Story, Meta } from "@storybook/html";
import { webComponentBind } from "./utils/webComponentUtils";

const meta: Meta = {
  title: "Contents/TinyEditor",
  argTypes: {
    id: { control: { disable: true } },
  },
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
