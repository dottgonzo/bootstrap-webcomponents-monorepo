#!/usr/bin/env node

import { program } from 'commander'
import fs from 'fs/promises'
import path from 'path'
// import pkg from './package.json'
const options = program.option('--dir <value>').parse().opts()

const componentPath = options?.dir

if (!componentPath) throw new Error(`component path is not defined`)

const docPathJs = path.join(componentPath, 'dist', 'docs.js')
const docPathMjs = docPathJs.replace('.js', '.mjs')
const componentDefinitionJsonPath = path.join(componentPath, 'dist', 'webcomponent.type.d.json')
const componentEventsDefinitionJsonPath = path.join(componentPath, 'dist', 'webcomponent_events.type.d.json')
const outputFile = path.join(componentPath, 'dist', 'manifest.json')
const packageJsonPath = path.join(componentPath, 'package.json')

async function assembleJson() {
  try {
    await fs.copyFile(docPathJs, docPathMjs)
    const mod = await import(docPathMjs)
    const componentDefinitions = JSON.parse(await fs.readFile(componentDefinitionJsonPath, 'utf-8'))
    const componentEventsDefinitions = JSON.parse(await fs.readFile(componentEventsDefinitionJsonPath, 'utf-8'))
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'))
    const pkg = JSON.parse(await fs.readFile('./package.json', 'utf-8'))
    const componentSetup = mod.componentSetup
    componentSetup.definitions = {
      events: componentEventsDefinitions,
      component: componentDefinitions,
    }
    componentSetup.version = packageJson.version
    componentSetup.dependencies = Object.keys(packageJson.dependencies)
      .filter((f) => f.includes(pkg.name.split('/')[0]) && !f.includes('jsutils') && !f.includes('bundle'))
      .map((m) => {
        const dep = {
          name: m,
          version: packageJson.dependencies[m],
        }
        return dep
      })
    const componentSetupToString = JSON.stringify(componentSetup, null, 2)
    await fs.writeFile(outputFile, componentSetupToString)
    await fs.rm(docPathMjs)
    await fs.rm(componentDefinitionJsonPath)
    await fs.rm(componentEventsDefinitionJsonPath)
    console.info('written to ' + outputFile)
  } catch (err) {
    throw err
  }
}

assembleJson().catch((err) => {
  console.error(err)
  process.exit(1)
})
