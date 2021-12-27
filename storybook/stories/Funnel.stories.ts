import { Story, Meta } from "@storybook/html";
import { createFunnel, FunnelProps } from "./Funnel";

export default {
  title: "Form/Funnel",
  argTypes: {
    id: { control: { disable: true } },
  },
} as Meta;
const preferences = [
  {
    type: "text",
    placeholder: "Inserisci titolo di default",
    id: "defaultTitle",
    required: true,

    label: "Titolo di default",
    value: "titolotest",
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
const Template: Story<FunnelProps> = (args) => createFunnel(args);

export const BasicFunnelTemplate = Template.bind({});
BasicFunnelTemplate.args = {
  id: "BasicFunnelTemplate",
};
export const BasicFunnelTemplateWithSchema = Template.bind({});
BasicFunnelTemplateWithSchema.args = {
  id: "BasicFunnelTemplateWithSchema",
  schemes: [preferences],
};
