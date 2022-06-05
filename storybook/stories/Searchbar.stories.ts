import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/searchbar/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, componentSetup.name);

export const Searchbar1 = Template.bind({});
Searchbar1.args = {
  id: "Searchbar1",
  action: "http://localhost:3000/search",
  resultitemtitlekey: "productName",
};
