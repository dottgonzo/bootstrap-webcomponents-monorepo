import { Story, Meta } from "@storybook/html";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { webComponentBind } from "./utils/webComponentUtils";

interface IColumn {
  _id?: string;
  cells: { label: string; key: string }[];
  title: string;
}
const meta: Meta = {
  title: "Pages/Invoice",
  argTypes: {
    id: { control: { disable: true } },
  },
};

export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, "invoice");

export const InvoceTemplate = Template.bind({});
InvoceTemplate.args = {
  id: "InvoceTemplate",
};
