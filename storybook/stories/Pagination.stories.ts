import { Story, Meta } from "@storybook/html";
import { createComponent } from "./webcomponentUtils";

const meta = {
  title: "Components/Pagination",
  argTypes: {
    page: { control: { type: "number" } },
    pages: { control: { type: "number" } },
    pagechange: { action: "pagechangeEvent" },
    id: { control: { disable: true } },
  },
};

export default meta as Meta;

const Template = (args) => createComponent(args, meta.argTypes, "paginate");

export const BasicPagination1 = Template.bind({});
BasicPagination1.args = {
  pages: 1,
  id: "BasicPagination1",
};
export const BasicPagination4 = Template.bind({});
BasicPagination4.args = {
  pages: 4,
  id: "BasicPagination4",
};
export const BasicPagination12 = Template.bind({});
BasicPagination12.args = {
  pages: 12,
  page: 2,
  id: "BasicPagination12",
};
