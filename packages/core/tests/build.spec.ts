import test from 'ava'
import rimraf from 'rimraf'

import themeBase from '../mock/themes/flate.json'

import Build from '../tools/build'

const SETTINGS = {
  themeName: 'flate.json',
}

const PROPS = {
  rootDir: {
    build: `${process.cwd()}/mock/temp/dist`,
    themes: `${process.cwd()}/mock/themes`,
  },
}

const MERGE = {
  stage: {
    colors: {
      a: '$red',
      b: '$cyan',
    },
  },
  final: {
    colors: {
      a: '#e84855',
      b: '#00cecb',
    },
  },
}

const clean = () => rimraf.sync(`${PROPS.rootDir.build}`)

test.beforeEach(clean)
test.afterEach(clean)

test('BUILD: List Themes', ({ deepEqual }) => {
  const build = new Build(PROPS)

  deepEqual([SETTINGS.themeName], build.listThemes)
})

test('BUILD: Get File', ({ deepEqual }) => {
  const build = new Build(PROPS)

  deepEqual(
    themeBase,
    Build.getFile(`${build.rootDir.themes}/${SETTINGS.themeName}`),
  )
})

test('BUILD: Create File', ({ assert }) => {
  const build = new Build(PROPS)

  assert(
    'created',
    Build.createFile({
      path: build.rootDir.build,
      file: themeBase,
      fileName: SETTINGS.themeName,
    }),
  )
})

test('BUILD: Create Variants', ({ assert, deepEqual }) => {
  const build = new Build(PROPS)

  build.theme.variants.push(themeBase)

  assert('created', build.createVariants())
  deepEqual({ [SETTINGS.themeName]: themeBase }, build.theme.final)
})

test('BUILD: Set Colors', ({ deepEqual }) => {
  const build = new Build(PROPS)

  const stage = {
    ...themeBase,
    colors: MERGE.stage.colors,
  }

  const final = {
    ...themeBase,
    colors: MERGE.final.colors,
  }

  build.theme.stage = stage

  build.setColors()

  deepEqual(final, build.theme.stage)
})

test('BUILD: Set Font Styles', ({ deepEqual }) => {
  const build = new Build(PROPS)

  build.theme.stage = {
    ...themeBase,
    tokenColors: [
      {
        settings: {},
      },
    ],
  }

  const expected: any[] = []

  themeBase.fontStyle.forEach(fontStyle => {
    expected.push({
      ...themeBase,
      tokenColors: [
        {
          settings: {
            fontStyle: fontStyle === 'none' ? '' : fontStyle,
          },
        },
      ],
      fontStyle: fontStyle === 'none' ? '' : fontStyle,
    })
  })

  build.setFontStyles()

  deepEqual(expected, build.theme.variants)
})
