import test from 'ava'

import { getMockPath } from '../utils'

import { IProps } from './eazy.interface'
import { EazyBuilder } from './eazy.builder'

const DEFAULT_PROPS: IProps = { ...getMockPath('eazy'), extension: 'conf' }

test('EAZY: Compilation', ({ assert }) => {
  const expected = new EazyBuilder(DEFAULT_PROPS).compile()
  assert('done', expected)
})
