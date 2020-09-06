import test from 'ava'

import { BuildCode } from '../tools/build'

import themeBase from './mock/themes/vscode/flate.json'

import { DEFAULT_PROPS, SETTINGS } from './constants'

const PROPS = {
  ...DEFAULT_PROPS,
  rootDir: {
    ...DEFAULT_PROPS.rootDir,
    themes: DEFAULT_PROPS.rootDir.themes.concat('/vscode'),
  },
}

test('BUILD CODE: Create many Variants', ({ assert, deepEqual }) => {
  const build = new BuildCode(PROPS)

  build.theme.stage = themeBase

  assert('created', build.createVariants())
  deepEqual({ [SETTINGS.themeName]: themeBase }, build.theme.final)
})

test('BUILD CODE: Create variant', ({ assert, deepEqual }) => {
  const build = new BuildCode(PROPS)

  build.theme.variants.push(themeBase)

  assert('created', build.createVariants())
  deepEqual({ [SETTINGS.themeName]: themeBase }, build.theme.final)
})

test('BUILD CODE: Set Font Styles', ({ deepEqual }) => {
  const build = new BuildCode(PROPS)

  build.theme.stage = themeBase

  const expected: any[] = []

  themeBase.fontStyle.forEach(fontStyle => {
    expected.push({
      ...themeBase,
      tokenColors: [
        {
          name: '',
          scope: [],
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

test('BUILD CODE: Compilation', ({ assert }) => {
  const expected = new BuildCode(PROPS).compile()
  assert('done', expected)
})
