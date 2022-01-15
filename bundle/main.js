const fs = require('fs/promises')
const path = require('path')
const pkg = require('./package.json')

async function run() {
    const packagesPath = path.resolve(__dirname, '..', 'packages')
    const packages = (await fs.readdir('../packages', { withFileTypes: true })).filter(f => f.isDirectory).map(m => m.name)

    let packagesCode = ''
    for (const package of packages) {
        packagesCode += `addComponent(${package});\n`
    }

    const baseCode = `function addComponent(componentName) {
        if (!document.getElementById("hb-" + componentName + "-script")) {
            const script = document.createElement("script");
            script.id = "hb-" + componentName + "-script";
            script.src = "https://cdn.jsdelivr.net/npm/@htmlbricks/hb-" + componentName + "@${pkg.version}/release/release.js";
            if (location.href.includes("localhost")) script.src = "http://localhost:6006/" + componentName + "/dist/release.js";
            document.head.appendChild(script);
        }
    }\n`

    console.log(packages)
    let iifecode = `(function(){${baseCode}${packagesCode}})`
    try {
        await fs.mkdir(path.resolve(__dirname, 'release'))

    } catch (err) {

    }
    await fs.writeFile(path.resolve(__dirname, 'release', 'release.js'), iifecode)
    console.log(iifecode)

}


run().then(() => {
    console.info('bundle done')
}).catch((err) => {
    throw new Error(err)
})