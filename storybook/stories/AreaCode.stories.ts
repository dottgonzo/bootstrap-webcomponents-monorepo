import { Story, Meta } from "@storybook/html";
import { webComponentBind } from "./utils/webComponentUtils";
const meta: Meta = {
  title: "Components/AreaCode",
  argTypes: {
    id: { control: { disable: true } },
    content: { control: { type: "text" } },
  },
};
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, "area-code");

export const AreaCode = Template.bind({});
AreaCode.args = {
  id: "AreaCode",
  content: "test",
};
export const AreaCodeLongText = Template.bind({});
AreaCodeLongText.args = {
  id: "AreaCodeLongText",
  content:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
};
