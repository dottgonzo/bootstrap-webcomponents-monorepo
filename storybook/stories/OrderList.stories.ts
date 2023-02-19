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
} from "../../packages/order-list/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(
    args,
    meta.argTypes as any,
    componentSetup.repoName,
    version,
    {
      style: { margin: "20px auto 20px auto" },
    }
  );

export const OrderListDefault = Template.bind({});

OrderListDefault.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "default")
);
