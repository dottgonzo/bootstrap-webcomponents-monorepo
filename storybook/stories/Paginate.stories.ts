import { Story, Meta } from "@storybook/html";
import {
  webComponentBind,
  argTypesExtraUtils,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/paginate/extra/docs";

const copy1 = Object.assign({}, argTypesExtraUtils);
const copy2 = Object.assign({}, storybookArgs);

const assigned = Object.assign({}, copy1, copy2);
const meta: Meta = {
  title: componentSetup.category + "/Pagination",
  argTypes: assigned,
};

export default meta as Meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, componentSetup.name);

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
