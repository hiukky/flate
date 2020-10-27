import test from 'ava'

import themeBase from './mock/flate.json'

import { BaseBuilder } from './base.builder'

import { COLORS, SETTINGS } from '../constants'
import { getMockPath, clean } from '../utils'

const DEFAULT_PROPS = getMockPath('base')

test.beforeEach(() => clean(DEFAULT_PROPS.rootDir.build))
test.afterEach(() => clean(DEFAULT_PROPS.rootDir.build))

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
