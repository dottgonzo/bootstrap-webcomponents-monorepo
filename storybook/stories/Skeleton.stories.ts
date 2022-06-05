import type { Story } from "@storybook/html";
import { webComponentBind, getStorybookMeta } from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/skeleton-component/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, componentSetup.name);

export const Skel = Template.bind({});
Skel.args = Object.assign(
  {
    id: "Skel",
    _testInnerHtml:
      '<span style="background-color:blue" slot="skelcontent">cooontent</span>',
  },
  componentSetup.examples[0].data
);
