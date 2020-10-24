import test from 'ava'

import themeBase from '../../../mock/themes/insomnia/flate.json'

import { InsomniaBuilder } from './insomnia.builder'

import { DEFAULT_PROPS, SETTINGS } from '../../constants'

const PROPS = {
  ...DEFAULT_PROPS,
  rootDir: {
    ...DEFAULT_PROPS.rootDir,
    themes: DEFAULT_PROPS.rootDir.themes.concat('/insomnia'),
  },
}

test('BUILD INSOMNIA: Create variant', ({ assert, deepEqual }) => {
  const build = new InsomniaBuilder(PROPS)

  build.theme.stage = themeBase

  assert('created', build.createVariants())
  deepEqual({ [SETTINGS.themeName]: themeBase }, build.theme.final)
})

test('BUILD INSOMNIA: Compilation', ({ assert }) => {
  const expected = new InsomniaBuilder(PROPS).compile()

  assert('done', expected)
})
