import test from 'ava'

import themeBase from './mock/flate.json'

import { InsomniaBuilder } from './insomnia.builder'

import { SETTINGS } from '../constants'
import { getMockPath } from '../utils'

const DEFAULT_PROPS = getMockPath('insomnia')

test('BUILD INSOMNIA: Create variant', ({ assert, deepEqual }) => {
  const build = new InsomniaBuilder(DEFAULT_PROPS)

  build.theme.stage = themeBase

  assert('created', build.createVariants())
  deepEqual({ [SETTINGS.themeName]: themeBase }, build.theme.final)
})

test('BUILD INSOMNIA: Compilation', ({ assert }) => {
  const expected = new InsomniaBuilder(DEFAULT_PROPS).compile()

  assert('done', expected)
})
