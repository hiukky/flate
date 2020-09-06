import test from 'ava'

import { Scss } from '../tools'

import { COLORS, DEFAULT_PROPS } from './constants'

test('Tools SCSS: Read File', ({ is }) => {
  const colors = new Scss().read(`${DEFAULT_PROPS.rootDir.scss}/theme.scss`)

  is('$cyan: #00cecb;$red: #e84855;', colors.replace('\n', '').slice(0, -1))
})

test('Tools SCSS: Parse File to JSON', ({ deepEqual }) => {
  const scss = new Scss()

  const colors = scss.read(`${DEFAULT_PROPS.rootDir.scss}/theme.scss`)

  deepEqual(COLORS.scssJSON, scss.toJSON(colors))
})

test('Tools SCSS: Resolve scss dependencies and return in JSON format', ({
  deepEqual,
}) => {
  const scss = new Scss()

  deepEqual(
    COLORS.scssJSON,
    scss.resolve(DEFAULT_PROPS.rootDir.scss, 'theme.scss'),
  )
})

test('Tools SCSS: Get colors', ({ deepEqual }) => {
  const scss = new Scss()

  deepEqual(
    COLORS.scssJSON,
    scss.getColors(DEFAULT_PROPS.rootDir.scss, 'theme'),
  )
})
