import { Story, Meta } from "@storybook/html";
import { webComponentBind } from "./utils/webComponentUtils";

const meta: Meta = {
  title: "Contents/ProductComparison",
  argTypes: {
    id: { control: { disable: true } },
    products: { control: { type: "array" } },
    headers: { control: { type: "array" } },
  },
};

export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, "product-comparison");

const products = [
  {
    id: "prrr",
    price: 10,
    model: "starter",
    description: "weekly",
    note: "rotto",
    char1: "valid",
    char2: "disabled",
    char3: "blocked",
    char4: "valid",
  },
  {
    id: "prrr2",
    price: 20,
    model: "starter",
    description: "weekly",
    note: "rotto",
    char1: "valid",
    char2: "disabled",
    char3: "blocked",
    char4: "valid",
  },
  {
    id: "prrr3",
    price: 30,
    model: "starter",
    description: "weekly",
    note: "rotto",
    char1: "valid",
    char2: "disabled",
    char3: "blocked",
    char4: "valid",
  },
];

const productHeader = [
  {
    id: "char1",
    label: "labello",
  },
];

export const ProductComparison = Template.bind({});
ProductComparison.args = {
  id: "ProductComparison",
  headers: productHeader,
  products,
};
