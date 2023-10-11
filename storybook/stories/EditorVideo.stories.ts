import "./main.css";
import type { Meta } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import lernaPkg from "../../lerna.json";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/editor-video/extra/docs";

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
const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "Editor/Video",
  tags: ["autodocs"],

  parameters: meta.parameters,

  argTypes: meta.argTypes,
  render: ({ label, ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    // @ts-ignore
    return webComponentBind(
      args,
      meta.argTypes,
      componentSetup.repoName,
      lernaPkg.version
    );
  },
};

export const BasicVideoeditor = {
  id: "BasicVideoeditor",
  src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
};
export const BasicVideoeditorWithTrack = {
  id: "BasicVideoeditorWithTrack",
  track,
  src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
};
export const BasicVideoeditorWithForm = {
  id: "BasicVideoeditorWithForm",
  form,
  src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
};
