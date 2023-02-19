import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import { version } from "../../lerna.json";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/paginate/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(
    args,
    meta.argTypes as any,
    componentSetup.repoName,
    version
  );

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
