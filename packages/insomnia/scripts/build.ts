import { InsomniaBuilder } from '@flate/core'

new InsomniaBuilder({
  rootDir: {
    themes: `${process.cwd()}/themes`,
    build: `${process.cwd()}/dist`,
  },
}).compile()
