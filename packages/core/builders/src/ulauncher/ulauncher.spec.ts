import test from 'ava'

import { cleanOutput, getMockPath } from '../utils'

import { UlauncherBuilder } from './ulauncher.builder'

const DEFAULT_PROPS = getMockPath('ulauncher')

test('Filenames', ({ deepEqual }) => {
  const build = new UlauncherBuilder(DEFAULT_PROPS)

  deepEqual(
    {
      manifest: 'manifest',
      theme: 'theme',
      themeGtk: 'theme-gtk-3.20',
    },
    build.fileNames,
  )
})

test('Read GTK styles', ({ is }) => {
  const expected = new UlauncherBuilder(DEFAULT_PROPS).readCommonTheme('gtk')

  is(
    cleanOutput(`.selected.item-box { border: none; }`),
    cleanOutput(expected).toString(),
  )
})

test('Read Theme styles', ({ is }) => {
  const expected = new UlauncherBuilder(DEFAULT_PROPS).readCommonTheme('main')

  is(
    cleanOutput(`
  @define-color bg_color $primaryColor;
  .app { background-color: @window_bg; }
  `),
    cleanOutput(expected).toString(),
  )
})

test('Compilation', ({ is }) => {
  const expected = new UlauncherBuilder(DEFAULT_PROPS).compile()
  is('done', expected)
})
