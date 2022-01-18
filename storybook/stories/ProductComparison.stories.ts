import { Story, Meta } from "@storybook/html";
import { webComponentBind } from "./utils/webComponentUtils";

const meta: Meta = {
  title: "Contents/ProductComparison",
  argTypes: {
    id: { control: { disable: true } },
    products: { control: { type: "array" } },
    options: { control: { type: "object" } },
    headers: { control: { type: "array" } },
    purchaseClick: { action: "pagechangeEvent" },
  },
};

export default meta;

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes, "product-comparison");

const products = [
  {
    id: "prrr",
    price: 19,
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
    price: 49,
    model: "professional",
    description: "weekly",
    note: "rotto",
    char1: "valid",
    char2: "disabled",
    char3: "blocked",
    char4: "valid",
  },
  {
    id: "prrr3",
    price: 99,
    model: "advanced",
    description: "weekly",
    note: "rotto",
    char1: "valid",
    char2: "disabled",
    char3: "blocked",
    char4: "valid",
  },
  {
    id: "prrr4",
    price: 199,
    model: "custom",
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
  {
    id: "char2",
    label: "labello2",
  },
  {
    id: "char3",
    label: "labello3",
  },
];

export const ProductComparison = Template.bind({});
ProductComparison.args = {
  id: "ProductComparison",
  headers: productHeader,
  products,
  options: { currency: "€" },
};
