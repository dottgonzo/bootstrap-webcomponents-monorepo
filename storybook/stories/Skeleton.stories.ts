import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/skeleton-component/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes as any, componentSetup.repoName);

export const Skel = Template.bind({});

Skel.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "default"),
  {
    _testInnerHtml:
      '<span style="background-color:blue" slot="skelcontent">cooontent</span>',
  }
);
