import { BuildInsomnia } from '@flate/core'

new BuildInsomnia({
  rootDir: {
    themes: `${process.cwd()}/themes`,
    build: `${process.cwd()}/dist`,
  },
}).compile()
