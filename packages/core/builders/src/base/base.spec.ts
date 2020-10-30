import test from 'ava'

import { BaseBuilder } from './base.builder'
import { FILE_CONF, FILE_JSON, FILE_YML, THEME_BASE } from './mock/samples'
import { COLORS, SETTINGS, EXTENSIONS } from '../constants'
import { getMockPath, clean } from '../utils'

const DEFAULT_PROPS = getMockPath('base')

test.beforeEach(() => clean(DEFAULT_PROPS.rootDir.build))
test.afterEach(() => clean(DEFAULT_PROPS.rootDir.build))

test('BUILD: List Files', ({ deepEqual }) => {
  const build = new BaseBuilder(DEFAULT_PROPS)

  const filter = (data: Array<string>) =>
    data.sort().filter(v => v !== 'samples.ts')

  deepEqual(filter(Object.values(EXTENSIONS)), filter(build.listThemes))
})

test('BUILD: Get JSON File', ({ deepEqual }) => {
  const build = new BaseBuilder(DEFAULT_PROPS)

  deepEqual(
    JSON.parse(FILE_JSON.toString()),
    build.getFile(`${build.rootDir.themes}/${EXTENSIONS.json}`),
  )
})

test('BUILD: Get CONF File', ({ assert }) => {
  const build = new BaseBuilder(DEFAULT_PROPS)

  assert(
    FILE_CONF.toString(),
    build.getFile(`${build.rootDir.themes}/${EXTENSIONS.conf}`),
  )
})

test('BUILD: Get YML File', ({ assert }) => {
  const build = new BaseBuilder(DEFAULT_PROPS)

  assert(
    FILE_YML.toString(),
    build.getFile(`${build.rootDir.themes}/${EXTENSIONS.yml}`),
  )
})

test('BUILD: Create File', ({ assert }) => {
  const build = new BaseBuilder(DEFAULT_PROPS)

  assert(
    'created',
    build.createFile({
      path: build.rootDir.build,
      file: FILE_JSON,
      fileName: SETTINGS.themeName,
    }),
  )
})

test('BUILD: Set Colors', ({ deepEqual }) => {
  const build = new BaseBuilder(DEFAULT_PROPS)

  const stage = {
    ...THEME_BASE,
    colors: COLORS.stage,
  }

  const final = {
    ...THEME_BASE,
    colors: COLORS.final,
  }

  build.theme.stage = stage

  build.setColors()

  deepEqual(final, build.theme.stage)
})

test('BUILD: Parse output to JSON', ({ deepEqual }) => {
  const build = new BaseBuilder(DEFAULT_PROPS)

  deepEqual(
    JSON.parse(FILE_JSON.toString()),
    build.parseFile(FILE_JSON, 'json'),
  )
})

test('BUILD: Parse output to String', ({ deepEqual }) => {
  const build = new BaseBuilder(DEFAULT_PROPS)

  deepEqual(FILE_JSON.toString(), build.parseFile(FILE_JSON))
})
