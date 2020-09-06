import { BuildCode } from '@flate/core'

new BuildCode({
  rootDir: {
    themes: `${process.cwd()}/themes`,
    build: `${process.cwd()}/dist`,
  },
}).compile()
