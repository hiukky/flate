import test from 'ava'
import rimraf from 'rimraf'

import themeBase from '../../../mock/themes/flate.json'

import { BaseBuilder } from './base.builder'

import { COLORS, DEFAULT_PROPS, SETTINGS } from '../../constants'

const clean = () => rimraf.sync(`${DEFAULT_PROPS.rootDir.build}`)

test.beforeEach(clean)
test.afterEach(clean)

test('BUILD: List Themes', ({ deepEqual }) => {
  const build = new BaseBuilder(DEFAULT_PROPS)

  deepEqual([SETTINGS.themeName], build.listThemes)
})

test('BUILD: Get File', ({ deepEqual }) => {
  const build = new BaseBuilder(DEFAULT_PROPS)

  deepEqual(
    themeBase,
    build.getFile(`${build.rootDir.themes}/${SETTINGS.themeName}`),
  )
})

test('BUILD: Create File', ({ assert }) => {
  const build = new BaseBuilder(DEFAULT_PROPS)

  assert(
    'created',
    build.createFile({
      path: build.rootDir.build,
      file: themeBase,
      fileName: SETTINGS.themeName,
    }),
  )
})

test('BUILD: Set Colors', ({ deepEqual }) => {
  const build = new BaseBuilder(DEFAULT_PROPS)

  const stage = {
    ...themeBase,
    colors: COLORS.stage,
  }

  const final = {
    ...themeBase,
    colors: COLORS.final,
  }

  build.theme.stage = stage

  build.setColors()

  deepEqual(final, build.theme.stage)
})
