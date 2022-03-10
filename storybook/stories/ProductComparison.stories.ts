import { Story, Meta } from "@storybook/html";
import {
  webComponentBind,
  argTypesExtraUtils,
} from "./utils/webComponentUtils";
import { storybookArgs } from "../../packages/product-comparison/extra/docs";

const copy1 = Object.assign({}, argTypesExtraUtils);
const copy2 = Object.assign({}, storybookArgs);

const assigned = Object.assign({}, copy1, copy2);
const meta: Meta = {
  title: "Sections/ProductComparison",
  argTypes: assigned,
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
    characteristics: {
      char1: "valid",
      char2: "disabled",
      char3: "blocked",
      char4: "valid",
    },
  },
  {
    id: "prrr2",
    price: 49,
    model: "professional",
    description: "weekly",
    note: "rotto",
    characteristics: {
      char1: "valid",
      char2: "disabled",
      char3: "blocked",
      char4: "valid",
    },
  },
  {
    id: "prrr3",
    price: 99,
    model: "advanced",
    description: "weekly",
    note: "rotto",
    characteristics: {
      char1: "valid",
      char2: "disabled",
      char3: "blocked",
      char4: "valid",
    },
  },
  {
    id: "prrr4",
    price: 199,
    model: "custom",
    description: "weekly",
    note: "rotto",

    characteristics: {
      char1: "valid",
      char2: "disabled",
      char3: "blocked",
      char4: "valid",
    },
  },
];

const products2 = [
  {
    id: "prrr",
    price: 19,
    model: "starter",
    description: "weekly",
    note: "rotto",
    characteristics: {
      char1: "valid",
      char2: "disabled",
      char3: "blocked",
      char4: "valid",
    },
  },
  {
    id: "prrr2",
    price: 49,
    model: "professional",
    description: "weekly",
    note: "rotto",
    characteristics: {
      char1: "valid",
      char2: "disabled",
      char3: "blocked",
      char4: "valid",
    },
  },
  {
    id: "prrr3",
    price: 99,
    model: "advanced",
    description: "weekly",
    note: "rotto",
    characteristics: {
      char1: "valid",
      char2: "disabled",
      char3: "blocked",
      char4: "valid",
    },
  },
  {
    id: "prrr4",
    price: 199,
    model: "custom",
    description: "weekly",
    note: "rotto",
    promotion: {
      note: "sale",
      type: "sale",
      originalPrice: 240,
    },
    columnColor: {
      background: "#fff",
      purchaseButton: "red",
    },

    characteristics: {
      char1: "valid",
      char2: "disabled",
      char3: "blocked",
      char4: "valid",
    },
  },
];

const products3 = [
  {
    id: "prrr",
    price: 19,
    model: "starter",
    description: "weekly",
    note: "rotto",
    characteristics: {
      char1: "valid",
      char2: "disabled",
      char3: "blocked",
      char4: "valid",
    },
  },
  {
    id: "prrr2",
    price: 49,
    model: "professional",
    description: "weekly",
    note: "rotto",
    characteristics: {
      char1: "valid",
      char2: "disabled",
      char3: "blocked",
      char4: "valid",
    },
  },
  {
    id: "prrr3",
    price: 99,
    model: "advanced",
    description: "weekly",
    note: "rotto",
    characteristics: {
      char1: "valid",
      char2: "disabled",
      char3: "blocked",
      char4: "valid",
    },
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
export const ProductComparisonWithSale = Template.bind({});
ProductComparisonWithSale.args = {
  id: "ProductComparisonWithSale",
  headers: productHeader,
  products: products2,
  options: { currency: "€", preferredProductId: "prrr3" },
};
export const Product3Comparison = Template.bind({});
Product3Comparison.args = {
  id: "Product3Comparison",
  headers: productHeader,
  products: products3,
  options: { currency: "€", preferredProductId: "prrr3" },
};
