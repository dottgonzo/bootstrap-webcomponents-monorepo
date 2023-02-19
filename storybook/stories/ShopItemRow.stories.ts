import type { Story } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/shop-item-row/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes as any, componentSetup.repoName);

export const ShopItemRow1 = Template.bind({});
ShopItemRow1.args = {
  id: "ShopItemRow1",
  img: "https://picsum.photos/200/250",
  url: "https://picsum.photos/200/250",
  badge: "New",
  title: "Card title",
  subtitle: "Card subtitle",
  text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
  rating: "5.55",
  ratingscale: "10",
  reviews: "1500",
  price: "$500",
  regularprice: "$600",
  footer: "Card footer",
  reviewsurl: "https://example.org",
};

export const ShopItemRow2 = Template.bind({});
ShopItemRow2.args = {
  id: "ShopItemRow2",
  img: "https://picsum.photos/200/250",
  url: "https://picsum.photos/200/250",
  _testInnerHtml: `<span slot="badge">New Slot</span>
    <span slot="title" id="title">Card title Slot</span>
    <span slot="subtitle">Card subtitle Slot</span>
    <span slot="text">Some quick example text to build on the card title and make up the bulk of the card's content. Slot</span>
    <span slot="reviews">2500 Slot</span>
    <span slot="price">$500 Slot</span>
    <span slot="regularprice">$600 Slot</span>
    <span slot="footer">Card footer Slot</span>`,
};
