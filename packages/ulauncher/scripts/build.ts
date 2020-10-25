import { UlauncherBuilder } from '@flate/core'

new UlauncherBuilder({
  rootDir: {
    themes: `${process.cwd()}/themes`,
    build: `${process.cwd()}/dist`,
  },
}).compile()
