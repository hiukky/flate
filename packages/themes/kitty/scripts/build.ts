import { TerminalBuilder } from '@flate/builders'

new TerminalBuilder({
  rootDir: {
    themes: `${process.cwd()}/themes`,
    build: `${process.cwd()}/dist`,
  },
  extension: 'conf',
}).compile()
