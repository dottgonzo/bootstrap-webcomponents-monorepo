import { Story, Meta } from "@storybook/html";
import {
  webComponentBind,
  argTypesExtraUtils,
  toPascalCase,
} from "./utils/webComponentUtils";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/shop-item-cell/extra/docs";

const copy1 = Object.assign({}, argTypesExtraUtils);
const copy2 = Object.assign({}, storybookArgs);

const assigned = Object.assign({}, copy1, copy2);
const meta: Meta = {
  title:
    componentSetup.category +
    "/" +
    toPascalCase(componentSetup.name.replace("hb-", "")),
  argTypes: assigned,
};

export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, componentSetup.name);

export const ShopItemCell1 = Template.bind({});
ShopItemCell1.args = {
  id: "ShopItemCell1",
  img: "https://picsum.photos/200/100",
  url: "https://picsum.photos/200/100",
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

export const ShopItemCell2 = Template.bind({});
ShopItemCell2.args = {
  id: "ShopItemCell2",
  img: "https://picsum.photos/200/100",
  url: "https://picsum.photos/200/100",
  _testInnerHtml: `<span slot="badge">New Slot</span>
    <span slot="title" id="title">Card title Slot</span>
    <span slot="subtitle">Card subtitle Slot</span>
    <span slot="text">Some quick example text to build on the card title and make up the bulk of the card's content. Slot</span>
    <span slot="reviews">2500 Slot</span>
    <span slot="price">$500 Slot</span>
    <span slot="regularprice">$600 Slot</span>
    <span slot="footer">Card footer Slot</span>`,
};
