import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/site-paragraph-with-image/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, componentSetup.name, {
    style: { margin: "20px auto 20px auto" },
  });

export const PragraphWithImageRegular = Template.bind({});

PragraphWithImageRegular.args = {
  id: "PragraphWithImageRegular",
  img: {
    src: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Commons-logo.svg/446px-Commons-logo.svg.png",
  },
  text: {
    title: "PragraphWithImage Regular",
    body: "lore ipsum dolor sit ame1t, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    link: {
      label: "linkato",
    },
  },
};

export const PragraphWithImageBigText = Template.bind({});

PragraphWithImageBigText.args = {
  id: "PragraphWithImageBigText",
  img: {
    src: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Commons-logo.svg/446px-Commons-logo.svg.png",
  },
  text: {
    title: "PragraphWithImage BigText",
    body: "lore ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    link: {
      label: "linkato",
    },
  },
};
export const PragraphWithImageWithNothings = Template.bind({});

PragraphWithImageWithNothings.args = {
  id: "PragraphWithImageWithNothings",
  img: {
    src: "",
  },
  text: {},
};
