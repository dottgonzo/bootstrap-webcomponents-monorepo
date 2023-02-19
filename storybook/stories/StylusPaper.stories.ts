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
} from "../../packages/stylus-paper/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(
    args,
    meta.argTypes as any,
    componentSetup.repoName,
    version
  );

export const Main = Template.bind({});
Main.args = setStorybookData(componentSetup.name, componentSetup.examples[0]);

export const WithPressure = Template.bind({});
WithPressure.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[1]
);

export const WithSimulatePressure = Template.bind({});
WithSimulatePressure.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[2]
);

export const WithThinBrush = Template.bind({});
WithThinBrush.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[3]
);

export const WithBigBrush = Template.bind({});
WithBigBrush.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[4]
);

export const LoadDraw = Template.bind({});
LoadDraw.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[5]
);

export const LoadImage = Template.bind({});
LoadImage.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[6]
);

export const LoadText = Template.bind({});
LoadText.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[7]
);
