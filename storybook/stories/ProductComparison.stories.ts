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
} from "../../packages/product-comparison/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "Site/ProductComparison",
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

export const ProductComparison = {
  id: "ProductComparison",
  headers: productHeader,
  products,
  options: { currency: "€" },
};
export const ProductComparisonWithSale = {
  id: "ProductComparisonWithSale",
  headers: productHeader,
  products: products2,
  options: { currency: "€", preferredProductId: "prrr3" },
};
export const Product3Comparison = {
  id: "Product3Comparison",
  headers: productHeader,
  products: products3,
  options: { currency: "€", preferredProductId: "prrr3" },
};
