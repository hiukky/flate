import { VScodeBuilder } from '@flate/builders'

new VScodeBuilder({
  rootDir: {
    themes: `${process.cwd()}/themes`,
    build: `${process.cwd()}/dist`,
  },
}).compile()
