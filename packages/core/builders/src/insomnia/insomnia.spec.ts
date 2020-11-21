import test from 'ava'

import themeBase from './mock/flate.json'

import { InsomniaBuilder } from './insomnia.builder'

import { SETTINGS } from '../constants'
import { getMockPath } from '../utils'

const DEFAULT_PROPS = getMockPath('insomnia')

test('Create variant', ({ is, deepEqual }) => {
  const build = new InsomniaBuilder(DEFAULT_PROPS)

  build.theme.stage = themeBase

  is('created', build.createVariants())
  deepEqual({ [SETTINGS.themeName]: themeBase }, build.theme.final)
})

test('Compilation', ({ is }) => {
  const expected = new InsomniaBuilder(DEFAULT_PROPS).compile()

  is('done', expected)
})
