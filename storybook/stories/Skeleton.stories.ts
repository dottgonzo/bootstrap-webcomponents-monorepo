import { Story, Meta } from "@storybook/html";
import {
  webComponentBind,
  argTypesExtraUtils,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/area-code/extra/docs";
const copy1 = Object.assign({}, argTypesExtraUtils);
const copy2 = Object.assign({}, storybookArgs);

const assigned = Object.assign({}, copy1, copy2);
const meta: Meta = {
  title: componentSetup.category + "/Skeleton",
  argTypes: assigned,
};
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, "skeleton-component");

export const Skel = Template.bind({});
Skel.args = {
  id: "Skel",
  json: { a: 1 },
  string: "ciao",
  boolean: false,
  _testInnerHtml:
    '<span style="background-color:blue" slot="skelcontent">cooontent</span>',
};
