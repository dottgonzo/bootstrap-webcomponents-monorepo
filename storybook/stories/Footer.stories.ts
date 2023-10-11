import "./main.css";
import type { Meta } from "@storybook/html";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import lernaPkg from "../../lerna.json";
import {
  storybookArgs,
  componentSetup,
} from "../../packages/footer/extra/docs";
import { IColumn } from "../../packages/footer/release/webcomponent.type";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "Layout/Footer",
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

const columns1: IColumn[] = [
  {
    cells: [
      {
        label: "test",
        _id: "test",
      },
      {
        label: "test2",
        _id: "test2",
      },
      {
        label: "test3",
        _id: "test3",
      },
    ],
    title: "stringtitle",
  },
];
const columns2: IColumn[] = [
  {
    cells: [
      {
        label: "test",
        _id: "test",
      },
      {
        label: "test2",
        _id: "test2",
      },
      {
        label: "test3",
        _id: "test3",
      },
    ],
    title: "stringtitle",
  },
  {
    cells: [
      {
        label: "test",
        _id: "test",
      },
      {
        label: "test2",
        _id: "test2",
      },
      {
        label: "test3",
        _id: "test3",
      },
    ],
    title: "stringtitle",
  },
];
const columns3: IColumn[] = [
  {
    cells: [
      {
        label: "test",
        _id: "test",
      },
      {
        label: "test2",
        _id: "test2",
      },
      {
        label: "test3",
        _id: "test3",
      },
    ],
    title: "stringtitle",
  },
  {
    cells: [
      {
        label: "test",
        _id: "test",
      },
      {
        label: "test2",
        _id: "test2",
      },
      {
        label: "test3",
        _id: "test3",
      },
    ],
    title: "stringtitle",
  },
  {
    cells: [
      {
        label: "test",
        _id: "test",
      },
      {
        label: "test2",
        _id: "test2",
      },
      {
        label: "test3",
        _id: "test3",
      },
    ],
    title: "stringtitle",
  },
];

const policies1 = [
  {
    label: "Privacy Policy",
    key: "privacypolicy",
  },
  {
    label: "Condizioni Generali",
    key: "generalcondition",
  },
  {
    label: "Cookie Policy",
    key: "cookiepolicy",
  },
];

const contacts1 = {
  sites: [
    {
      label: "dariocaruso.info",
      uri: "https://dariocaruso.info",
    },
  ],
  phones: [
    {
      number: "6666666666666",
    },
  ],
  addresses: [],
  emails: [],
};
const socials1 = {
  facebook: "fbbb",
  youtube: "yttttttt",
};

const company1 = {
  logoUri:
    "https://upload.wikimedia.org/wikipedia/commons/8/80/Wikipedia-logo-v2.svg",
  siteName: "testsite",
  companyName: "testcompany S.R.L.",
  registration: "copyright",
  description: `testo e descrizione di esempio dell'applicazione`,
  vatNumber: "aa - ffffff",
  fiscalCode: "f4f5f6fff",
};

const brandandcontacts1 = {};
const footerbottom1 = {};

export const Footer = {
  id: "Footer",
  company: company1,
  brandandcontacts: brandandcontacts1,
  columns: columns1,
  footerbottom: footerbottom1,
  policies: policies1,
  contacts: contacts1,
  socials: socials1,
};

export const FooterMobile = {
  id: "FooterMobile",
  company: company1,
  brandandcontacts: brandandcontacts1,
  columns: columns1,
  footerbottom: footerbottom1,
  policies: policies1,
  parameters: {
    viewport: {
      defaultViewport: "iphonex",
    },
  },
};

export const FooterWithBrand = {
  id: "FooterWithBrand",
  company: company1,
  brandandcontacts: brandandcontacts1,
};
export const FooterWithColumns = {
  id: "FooterWithColumns",
  company: company1,
  contacts: contacts1,

  columns: columns1,
};
export const FooterWithBottom = {
  id: "FooterWithBottom",
  footerbottom: footerbottom1,
  company: company1,
};
export const FooterSmall = {
  id: "FooterSmall",
  company: company1,
  brandandcontacts: brandandcontacts1,
  columns: columns1,
  footerbottom: footerbottom1,
  policies: policies1,
  contacts: contacts1,
  socials: socials1,
  type: "small",
};
