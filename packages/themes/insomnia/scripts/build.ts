import { InsomniaBuilder } from '@flate/builders'

new InsomniaBuilder({
  rootDir: {
    themes: `${process.cwd()}/themes`,
    build: `${process.cwd()}/dist`,
  },
}).compile()
