import { EazyBuilder } from '@flate/builders'

new EazyBuilder({
  rootDir: {
    themes: `${process.cwd()}/themes`,
    build: `${process.cwd()}/release`,
  },
  extension: 'conf',
}).compile()
