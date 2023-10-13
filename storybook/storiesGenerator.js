const fs = require("fs/promises");

async function generateStory() {
  const packages = await fs.readdir("../packages");

  for (const package of packages.filter((f) => f !== "bundle")) {
    const manifestFile = await fs.readFile(
      `../packages/${package}/release/manifest.json`
    );
    const manifest = JSON.parse(manifestFile);

    let ex = "";
    for (let i = 0; i < manifest.examples.length; i++) {
      ex += `
export const ${package.replace(/-/g, "")}${i} = {
  args: setStorybookData(componentSetup.name, componentSetup.examples[${i}]),
};
`;
    }

    const story = `import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from "storybook-wc-utils";
import lernaPkg from "../../lerna.json";
import { storybookArgs, componentSetup } from "../../packages/${package}/extra/docs";

const meta = getStorybookMeta(storybookArgs, componentSetup);
export default {
  title: "${manifest.category}/${package.replace(/-/g, "")}",
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
      `./stories/${package.replace(/-/g, "")}.stories.js`,
      story
    );
  }
}
generateStory().catch((err) => console.error(err));
