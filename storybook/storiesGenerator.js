const fs = require("fs/promises");

function titleCase(str) {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
}

async function generateStory() {
  const packages = await fs.readdir("../packages");

  for (const package of packages.filter((f) => f !== "bundle")) {
    const manifestFile = await fs.readFile(
      `../packages/${package}/release/manifest.json`
    );
    const manifest = JSON.parse(manifestFile);

    let ex = "";
    for (let i = 0; i < manifest.examples.length; i++) {
      let name = manifest.examples[i].name || "default";
      name = name.replace(/-/g, "");
      if (name === "default") name = "Base";
      if (name === "switch") name = "switcher";
      ex += `
export const ${name} = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[${i}]),
};
`;
    }

    const story = `
import "./main.css";
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import type { Meta } from "@storybook/html";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/${package}/extra/docs";

const meta: Meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "${manifest.category}/${titleCase(package.replace(/-/g, " "))}",
  tags: ["autodocs"],

  parameters: meta.parameters,

  argTypes: meta.argTypes,
  render: ({ label, ...args }) => {
    return webComponentBind(
      args,
      meta.argTypes,
      componentSetup.repoName,
      lernaPkg.version
    );
  },
};
${ex}
`;

    await fs.writeFile(
      `./stories/${package.replace(/-/g, "")}.stories.ts`,
      story
    );
  }
}
generateStory().catch((err) => console.error(err));
