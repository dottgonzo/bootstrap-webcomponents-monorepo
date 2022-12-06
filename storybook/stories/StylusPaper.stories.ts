import type { Story } from '@storybook/html'
import {
  webComponentBind,
  getStorybookMeta,
  setStorybookData,
} from './utils/webComponentUtils'
import {
  storybookArgs,
  componentSetup,
} from '../../packages/stylus-paper/extra/docs'

const meta = getStorybookMeta(storybookArgs, componentSetup)
export default meta

const Template: Story = (args) =>
  webComponentBind(args, meta.argTypes as any, componentSetup.name)

export const Main = Template.bind({})
Main.args = setStorybookData(componentSetup.name, componentSetup.examples[0])

export const WithPressure = Template.bind({})
WithPressure.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[1],
)

export const WithThinBrush = Template.bind({})
WithThinBrush.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[2],
)

export const WithBigBrush = Template.bind({})
WithBigBrush.args = setStorybookData(
  componentSetup.name,
  componentSetup.examples[3],
)
