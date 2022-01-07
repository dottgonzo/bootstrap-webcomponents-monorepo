import { Story, Meta } from "@storybook/html";
import { createFormHost, FormHostProps } from "./FormHost";
// import type { FormSchema } from "../../packages/formhostcomponent/app/types/webcomponent.type";

export default {
  title: "Form/Host",
  argTypes: {
    id: { control: { disable: true } },
    schema: { control: { type: "object" } },
    submit: { action: "submitEvent" },
    submitted: { control: { type: "boolean" } },
  },
} as Meta;

const Template: Story<FormHostProps> = (args) => createFormHost(args);

const schema1 = [
  {
    id: "name-row",
    type: "row",
    params: {
      columns: [
        {
          type: "text",
          placeholder: "Insert your first name here...",
          id: "firstName",
          required: true,
          label: "First Name",
          validationTip: "This field cannot be empty.",
        },
        {
          type: "text",
          placeholder: "Insert your last name here...",
          id: "lastName",
          required: true,
          label: "Last Name",
          validationTip: "This field cannot be empty.",
        },
        {
          type: "text",
          placeholder: "Insert your last namez here...",
          id: "lastNamez",
          label: "Last Namez",
          validationTip: "This field cannot be emptyz.",
        },
        {
          type: "select",
          placeholder: "Select something here...",
          id: "selectsomething",
          required: true,
          label: "Selection of something",
          validationTip: "This field cannot be empty.",
          params: {
            options: [
              { label: "", value: "" },
              { label: "testlabel", value: "testvalue" },
            ],
          },
        },
      ],
    },
  },
  {
    type: "number",
    id: "age",
    required: true,
    label: "Age",
    params: {
      min: 8,
      max: 120,
    },
    validationTip: "Min 8, Max 120",
  },
  {
    type: "text",
    placeholder: "Insert your last name here...",
    id: "lastName2",
    required: true,
    label: "Last Name",
    validationTip: "This field cannot be empty.",
  },
  {
    type: "textarea",
    placeholder: "Insert your last name22 here...",
    id: "lastName22",
    required: true,
    label: "Last Name2",
    validationTip: "This field cannot be empty2.",
  },
];
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
const schemaFile = [
  {
    type: "file",
    placeholder: "Inserisci file",
    id: "filetest",
    required: true,
    label: "File di default",
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
const conditionalSchema = [
  {
    type: "text",
    placeholder: "Inserisci titolo di default",
    id: "defaultTitleCond",
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
    id: "CondAge",
    required: true,
    dependencies: [
      {
        id: "defaultTitleCond",
        values: ["00000000"],
      },
    ],

    label: "Age",
    value: 9,
    params: {
      min: 8,
      max: 120,
    },
    validationTip: "Min 8, Max 120",
  },
];
export const FormHostTemplate = Template.bind({});
FormHostTemplate.args = {
  id: "BasicFormHost",
  schema: schema1,
};

export const FormHostWithFileTemplate = Template.bind({});
FormHostWithFileTemplate.args = {
  id: "FormHostWithFileTemplate",
  schema: schemaFile,
};

export const FormHostTemplateCompiled = Template.bind({});
FormHostTemplateCompiled.args = {
  id: "FormHostTemplateCompiled",
  schema: preferences,
};
export const FormHostTemplateConditional = Template.bind({});
FormHostTemplateConditional.args = {
  id: "FormHostTemplateConditional",
  schema: conditionalSchema,
};
