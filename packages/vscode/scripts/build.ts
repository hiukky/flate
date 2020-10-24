import { VScodeBuilder } from '@flate/core'

new VScodeBuilder({
  rootDir: {
    themes: `${process.cwd()}/themes`,
    build: `${process.cwd()}/dist`,
  },
}).compile()
