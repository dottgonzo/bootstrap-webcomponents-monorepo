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
} from "../../packages/funnel/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;
const preferences = [
  {
    type: "text",
    placeholder: "Inserisci titolo di default",
    id: "defaultTitle",
    required: true,

    label: "Titolo di default",
    value: "numtest",
    params: {
      minLength: 8,
      maxLength: 120,
    },
  },
  {
    type: "number",
    id: "age",
    required: true,
    label: "Age",
    value: 9,
    params: {
      min: 8,
      max: 120,
    },
    validationTip: "Min 8, Max 120",
  },
];
const preferences2 = [
  {
    type: "text",
    placeholder: "Inserisci titolo di default2",
    id: "defaultTitle2",
    required: true,

    label: "Titolo di default2",
    value: "ntest2",
    params: {
      minLength: 8,
      maxLength: 120,
    },
  },
  {
    type: "number",
    id: "age2",
    required: true,
    label: "Age2",
    value: 20,
    params: {
      min: 8,
      max: 120,
    },
    validationTip: "Min 8, Max 120",
  },
];
const preferences3 = [
  {
    type: "text",
    placeholder: "Inserisci titolo di default3",
    id: "defaultTitle3",
    required: true,

    label: "Titolo di default3",
    value: "ntest3",
    params: {
      minLength: 8,
      maxLength: 120,
    },
  },
];
const preferences4 = [
  {
    type: "text",
    placeholder: "Inserisci titolo di default4",
    id: "defaultTitle4",
    required: true,

    label: "Titolo di default4",
    value: "ntest36666666",
    params: {
      minLength: 8,
      maxLength: 120,
    },
  },
];
const Template: Story = (args) =>
  webComponentBind(
    args,
    meta.argTypes as any,
    componentSetup.repoName,
    version
  );

export const BasicFunnelTemplate = Template.bind({});
BasicFunnelTemplate.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find((f) => f.name === "BasicFunnelTemplate")
);
export const BasicFunnelTemplateWith2StepsSchema = Template.bind({});

BasicFunnelTemplateWith2StepsSchema.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find(
    (f) => f.name === "BasicFunnelTemplateWith2StepsSchema"
  )
);
export const BasicFunnelTemplateWith3StepsSchema = Template.bind({});

BasicFunnelTemplateWith3StepsSchema.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find(
    (f) => f.name === "BasicFunnelTemplateWith3StepsSchema"
  )
);
export const BasicFunnelTemplateWith4StepsSchema = Template.bind({});

BasicFunnelTemplateWith4StepsSchema.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples.find(
    (f) => f.name === "BasicFunnelTemplateWith4StepsSchema"
  )
);
