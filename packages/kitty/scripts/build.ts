import { TerminalBuilder } from '@flate/core'

new TerminalBuilder({
  rootDir: {
    themes: `${process.cwd()}/themes`,
    build: `${process.cwd()}/dist`,
  },
  extension: 'conf',
}).compile()
