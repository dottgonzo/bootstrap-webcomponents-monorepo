//
import fs from "fs/promises";
import path from "path";

async function writeReadme() {
  const packagesPath = path.resolve(__dirname, "..", "packages");
  const packages = (await fs.readdir(packagesPath, { withFileTypes: true }))
    .filter((f) => f.isDirectory && f.name !== "bundle" && f.name !== "jsutils")
    .map((m) => m.name);

  for (const pkg of packages) {
    const packagePath = path.join(packagesPath, pkg);
    const readmePath = path.join(packagePath, "README.md");

    console.log("write", readmePath);
  }
}

writeReadme().catch((err) => {
  throw err;
});
