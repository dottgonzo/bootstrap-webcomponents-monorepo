import "./main.css";
import type { Meta } from "@storybook/html";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/map/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "Graph/Map",
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

export const MapTemplate = {
  args: {
    id: "MapTemplate",
    center: [10, 10],
    zoom: 9,
    source: { type: "osm" },
    options: { centerFromGeometries: true },
    data: [
      {
        marker: {
          lngLat: [10.1, 10],
          icon: {
            uri: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Visual_Studio_Code_Insiders_1.36_icon.svg",
            scale: 0.15,
            anchor: [0.5, 0.1],
          },
          popupHtml: "<p>You clicked here:</p><code>ciao</code>",
        },
      },
      {
        marker: {
          lngLat: [10, 10],
          popupHtml: "<p>You clicked here:</p><code>ciao</code>",
        },
      },
      {
        marker: {
          lngLat: [10.3, 10],
        },
      },
    ],
  },
};

export const MapTemplate2 = {
  args: {
    id: "MapTemplate2",
    center: [15.084139339274458, 37.517380419266615],
    zoom: 16,
    source: { type: "osm" },
    data: [
      {
        marker: {
          lngLat: [15.084139339274458, 37.517380419266615],
        },
      },
    ],
  },
};
