import { Story, Meta } from "@storybook/html";
import {
  webComponentBind,
  argTypesExtraUtils,
  toPascalCase,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/editor-tinymce/extra/docs";

const copy1 = Object.assign({}, argTypesExtraUtils);
const copy2 = Object.assign({}, storybookArgs);

const assigned = Object.assign({}, copy1, copy2);
const meta: Meta = {
  title:
    componentSetup.category +
    "/" +
    toPascalCase(componentSetup.name.replace("hb-", "")),
  argTypes: assigned,
};

export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, componentSetup.name);

export const TinyEditorTemplate = Template.bind({});
TinyEditorTemplate.args = {
  id: "TinyEditorTemplate",
};

export const TinyEditorTemplateWithUploadUrl = Template.bind({});
TinyEditorTemplateWithUploadUrl.args = {
  id: "TinyEditorTemplateWithUploadUrl",
};
