import test from 'ava'

import { BuildInsomnia } from '../tools'

import { DEFAULT_PROPS } from './constants'

const PROPS = {
  ...DEFAULT_PROPS,
  rootDir: {
    ...DEFAULT_PROPS.rootDir,
    themes: DEFAULT_PROPS.rootDir.themes.concat('/insomnia'),
  },
}

test('BUILD INSOMNIA: Compilation', ({ assert }) => {
  const expected = new BuildInsomnia(PROPS).compile()

  assert('done', expected)
})
