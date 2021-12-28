import { Story, Meta } from "@storybook/html";
import { createFunnel, FunnelProps } from "./Funnel";

export default {
  title: "Form/Funnel",
  argTypes: {
    id: { control: { disable: true } },
    submitstep: {
      options: ["no", "yes"],
      control: { type: "select" },
    },
    update: { action: "updateEvent" },
    submit: { action: "submitEvent" },
  },
} as Meta;
const preferences = [
  {
    type: "text",
    placeholder: "Inserisci titolo di default",
    id: "defaultTitle",
    required: true,

    label: "Titolo di default",
    value: "numtest",
    params: {
      minlength: 8,
      maxlength: 120,
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
      minlength: 8,
      maxlength: 120,
    },
  },
  {
    type: "number",
    id: "age2",
    required: true,
    label: "Age",
    value: 20,
    params: {
      min: 8,
      max: 120,
    },
    validationTip: "Min 8, Max 120",
  },
];
const Template: Story<FunnelProps> = (args) => createFunnel(args);

export const BasicFunnelTemplate = Template.bind({});
BasicFunnelTemplate.args = {
  id: "BasicFunnelTemplate",
};
export const BasicFunnelTemplateWith2StepsSchema = Template.bind({});
BasicFunnelTemplateWith2StepsSchema.args = {
  id: "BasicFunnelTemplateWith2StepsSchema",
  schemes: [preferences],
};
export const BasicFunnelTemplateWith3StepsSchema = Template.bind({});
BasicFunnelTemplateWith3StepsSchema.args = {
  id: "BasicFunnelTemplateWith3StepsSchema",
  schemes: [preferences, preferences2],
};
