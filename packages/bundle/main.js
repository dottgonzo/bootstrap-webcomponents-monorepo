const fs = require('fs/promises')
const path = require('path')
const pkg = require('./package.json')

async function run() {
    const packagesPath = path.resolve(__dirname, '..')
    const packages = (await fs.readdir(packagesPath, { withFileTypes: true })).filter(f => f.isDirectory && f.name !== 'bundle').map(m => m.name)

    let packagesCode = ''
    for (const package of packages) {
        packagesCode += `addComponent("${package}");\n`
    }

    const baseCode = `function addComponent(componentName) {
        if (!document.getElementById("hb-" + componentName + "-script")) {
            const script = document.createElement("script");
            script.id = "hb-" + componentName + "-script";
            script.src = "https://cdn.jsdelivr.net/npm/@htmlbricks/hb-" + componentName + "@${pkg.version}/release/release.js";
            document.head.appendChild(script);
        }
    }\n`

    const iifecode = `(function(){${baseCode}${packagesCode}})()`
    try {
        await fs.mkdir(path.resolve(__dirname, 'dist'))

    } catch (err) {

    }
    await fs.writeFile(path.resolve(__dirname, 'dist', 'release.js'), iifecode)
    console.log(iifecode)

}


run().then(() => {
    console.info('bundle done')
}).catch((err) => {
    throw new Error(err)
})