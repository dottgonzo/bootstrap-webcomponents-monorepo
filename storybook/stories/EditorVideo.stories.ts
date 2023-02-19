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
} from "../../packages/editor-video/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const track = {
  maxValue: 2,
  minValue: 0,
};

const form = [
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
const Template: Story = (args) =>
  webComponentBind(
    args,
    meta.argTypes as any,
    componentSetup.repoName,
    version
  );

export const BasicVideoeditor = Template.bind({});
BasicVideoeditor.args = {
  id: "BasicVideoeditor",
  src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
};
export const BasicVideoeditorWithTrack = Template.bind({});
BasicVideoeditorWithTrack.args = {
  id: "BasicVideoeditorWithTrack",
  track,
  src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
};
export const BasicVideoeditorWithForm = Template.bind({});
BasicVideoeditorWithForm.args = {
  id: "BasicVideoeditorWithForm",
  form,
  src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
};
