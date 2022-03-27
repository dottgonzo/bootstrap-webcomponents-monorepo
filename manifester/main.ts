#!/usr/bin/env node

import { program } from 'commander'
import fs from 'fs/promises'
import path from 'path'

const options = program.option('--dir <value>').parse().opts()

const componentPath = options?.dir

if (!componentPath) throw new Error(`component path is not defined`)

const docPathJs = path.join(componentPath, 'dist', 'docs.js')
const docPathMjs = docPathJs.replace('.js', '.mjs')
const componentDefinitionJsonPath = path.join(componentPath, 'dist', 'webcomponent.type.d.json')
const componentEventsDefinitionJsonPath = path.join(componentPath, 'dist', 'webcomponent_events.type.d.json')
const outputFile = path.join(componentPath, 'dist', 'manifest.json')

async function assembleJson() {
  try {
    await fs.copyFile(docPathJs, docPathMjs)
    const mod = await import(docPathMjs)
    const componentDefinitions = JSON.parse(await fs.readFile(componentDefinitionJsonPath, 'utf-8'))
    const componentEventsDefinitions = JSON.parse(await fs.readFile(componentEventsDefinitionJsonPath, 'utf-8'))
    const componentSetup = mod.componentSetup
    componentSetup.definitions = {
      events: componentEventsDefinitions,
      component: componentDefinitions,
    }
    const componentSetupToString = JSON.stringify(componentSetup, null, 2)
    await fs.writeFile(outputFile, componentSetupToString)
    console.info('written to ' + outputFile)
  } catch (err) {
    throw err
  }
}

assembleJson().catch((err) => {
  console.error(err)
  process.exit(1)
})
