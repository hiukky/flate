import test from 'ava'

import { resolve } from 'path'
import { ScssTool } from './scss.tool'

import { COLORS } from '../constants'
import { getMockPath } from '../utils'

const DEFAULT_PROPS = getMockPath('scss')

test('Read File', ({ is }) => {
  const colors = new ScssTool().read(`${DEFAULT_PROPS.rootDir.scss}/theme.scss`)

  is('$cyan: #00cecb;$red: #e84855;', colors.replace('\n', '').slice(0, -1))
})

test('Parse File to JSON', ({ deepEqual }) => {
  const scss = new ScssTool()

  const colors = scss.read(`${DEFAULT_PROPS.rootDir.scss}/theme.scss`)

  deepEqual(COLORS.scssJSON, scss.toJSON(colors))
})

test('Resolve scss dependencies and return in JSON format', ({ deepEqual }) => {
  const scss = new ScssTool()

  deepEqual(
    COLORS.scssJSON,
    scss.resolve(DEFAULT_PROPS.rootDir.scss, 'theme.scss'),
  )
})

test('Get colors', ({ deepEqual }) => {
  const scss = new ScssTool()

  deepEqual(
    COLORS.scssJSON,
    scss.getColors(DEFAULT_PROPS.rootDir.scss, 'theme'),
  )
})

test('Get colors directory', ({ is }) => {
  const scss = new ScssTool()
  const expectedPath = resolve(__dirname, '..', '..', 'scss')

  is(expectedPath, scss.colorDirectory)
})
