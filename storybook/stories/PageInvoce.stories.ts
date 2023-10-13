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
} from "../../packages/page-invoice/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "Page/Ivoice",
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

export const InvoceTemplate = {
  args: {
    id: "InvoceTemplate",
    headers: {
      serial: "seriale1",
      from: {
        piva: "piva",
        name: "companyfrom",
        address: "address",
        email: "email",
        phone: "phone",
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/af/Free_Content_Logo.svg",
        shortName: "Acme SpA",
      },
      to: {
        piva: "to iva",
        name: "to name",
        address: "to address",
        email: "to@email.com",
        phone: "tototo",
      },
    },
    items: [
      {
        unitaryPrice: 2,
        taxPercentage: 3,
        desc: "testitem",
      },
      {
        unitaryPrice: 5,
        taxPercentage: 7,
        desc: "testitem2",
      },
    ],
  },
};
