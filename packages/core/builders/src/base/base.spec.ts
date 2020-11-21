import test from 'ava'

import { BaseBuilder } from './base.builder'
import { FILE_CONF, FILE_JSON, FILE_YML, THEME_BASE } from './mock/samples'
import { COLORS, SETTINGS, EXTENSIONS } from '../constants'
import { getMockPath, clean, cleanOutput } from '../utils'

const DEFAULT_PROPS = getMockPath('base')

test.beforeEach(() => clean(DEFAULT_PROPS.rootDir.build))
test.afterEach(() => clean(DEFAULT_PROPS.rootDir.build))

test('List Files', ({ deepEqual }) => {
  const build = new BaseBuilder(DEFAULT_PROPS)

  const filter = (data: Array<string>) =>
    data.sort().filter(v => v !== 'samples.ts')

  deepEqual(filter(Object.values(EXTENSIONS)), filter(build.listThemes))
})

test('Get JSON File', ({ deepEqual }) => {
  const build = new BaseBuilder(DEFAULT_PROPS)

  deepEqual(
    JSON.parse(FILE_JSON.toString()),
    build.getFile(`${build.rootDir.themes}/${EXTENSIONS.json}`),
  )
})

test('Get CONF File', ({ is }) => {
  const build = new BaseBuilder(DEFAULT_PROPS)

  is(
    cleanOutput(FILE_CONF.toString()),
    cleanOutput(build.getFile(`${build.rootDir.themes}/${EXTENSIONS.conf}`)),
  )
})

test('Get YML File', ({ is }) => {
  const build = new BaseBuilder(DEFAULT_PROPS)

  is(
    cleanOutput(FILE_YML.toString()),
    cleanOutput(build.getFile(`${build.rootDir.themes}/${EXTENSIONS.yml}`)),
  )
})

test('Create File', ({ is }) => {
  const build = new BaseBuilder(DEFAULT_PROPS)

  is(
    'created',
    build.createFile({
      path: build.rootDir.build,
      file: FILE_JSON,
      fileName: SETTINGS.themeName,
    }),
  )
})

test('Set Colors', ({ deepEqual }) => {
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

test('Parse output to JSON', ({ deepEqual }) => {
  const build = new BaseBuilder(DEFAULT_PROPS)

  deepEqual(
    JSON.parse(FILE_JSON.toString()),
    build.parseFile(FILE_JSON, 'json'),
  )
})

test('Parse output to String', ({ deepEqual }) => {
  const build = new BaseBuilder(DEFAULT_PROPS)

  deepEqual(FILE_JSON.toString(), build.parseFile(FILE_JSON))
})
