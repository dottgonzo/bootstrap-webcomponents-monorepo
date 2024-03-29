const fs = require('fs/promises')
const path = require('path')
const pkg = require('./package.json')

async function run() {
    const packagesPath = path.resolve(__dirname, '..')
    const packages = (await fs.readdir(packagesPath, { withFileTypes: true })).filter(f => f.isDirectory && f.name !== 'bundle').map(m => m.name)

    const npmGroup = pkg.name.split('/')[0]

    let packagesCode = ''
    let packagesMainDatas = []
    let packagesDatas = []
    for (const package of packages) {
        const manifestPath = path.join(packagesPath, package, 'release', 'manifest.json')
        const packageData = JSON.parse(await fs.readFile(manifestPath, 'utf-8'))
        packagesDatas.push(packageData)
        packagesCode += `addComponent("${package}");\n`
    }

    const baseCode = `function addComponent(componentName) {
        if (!document.getElementById("hb-" + componentName + "-script")) {
            const script = document.createElement("script");
            script.id = "hb-" + componentName + "-script";
            script.src = "https://cdn.jsdelivr.net/npm/${npmGroup}/hb-" + componentName + "@${pkg.version}/release/release.js";
            document.head.appendChild(script);
        }
    }\n`

    const iifecode = `(function(){${baseCode}${packagesCode}})()`
    try {
        await fs.mkdir(path.resolve(__dirname, 'dist'))

    } catch (err) {

    }
    await fs.writeFile(path.resolve(__dirname, 'dist', 'release.js'), iifecode)
    packagesMainDatas = packagesDatas.map(m => {
        const pkgUsefulData = {

            i18n: m.i18n,
            name: m.name,
            category: m.category,
            tags: m.tags,
            size: m.size,
            iifePath: m.iifePath,
            repoName: m.repoName,
            version: m.version
        }
        return pkgUsefulData
    })
    await fs.writeFile(path.resolve(__dirname, 'dist', 'list.json'), JSON.stringify({ packages: packagesMainDatas, version: pkg.version }))
    await fs.writeFile(path.resolve(__dirname, 'dist', 'bundle.json'), JSON.stringify({ packages: packagesDatas, version: pkg.version }))
}


run().then(() => {
    console.info('bundle done')
}).catch((err) => {
    throw new Error(err)
})