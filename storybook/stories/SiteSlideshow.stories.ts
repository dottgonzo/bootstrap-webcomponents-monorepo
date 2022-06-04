import type { Story } from "@storybook/html";
import { webComponentBind, getStorybookMeta } from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/site-slideshow/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, componentSetup.name);

export const SiteSlideshowTemplate = Template.bind({});
SiteSlideshowTemplate.args = {
  id: "SiteSlideshowTemplate",
  data: [
    {
      href: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Free_high-resolution_pictures_you_can_use_on_your_personal_and_commercial_projects._%2814355732205%29.jpg/800px-Free_high-resolution_pictures_you_can_use_on_your_personal_and_commercial_projects._%2814355732205%29.jpg",
      caption: "Street",
    },
    {
      href: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Relief_World_Map_by_maps-for-free.jpg/783px-Relief_World_Map_by_maps-for-free.jpg",
      caption: "Earth",
    },
    {
      href: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Thomisus_onustus_with_Apis_mellifera.jpg/800px-Thomisus_onustus_with_Apis_mellifera.jpg",
      caption: "Bee",
    },
  ],
  index: 0,
};
