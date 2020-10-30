import test from 'ava'

import { getMockPath } from '../utils'

import { UlauncherBuilder } from './ulauncher.builder'

const DEFAULT_PROPS = getMockPath('ulauncher')

test('ULAUNCHER: Compilation', ({ assert }) => {
  const expected = new UlauncherBuilder(DEFAULT_PROPS).compile()
  assert('done', expected)
})
