import { UlauncherBuilder } from '@flate/builders'

new UlauncherBuilder({
  rootDir: {
    themes: `${process.cwd()}/themes`,
    build: `${process.cwd()}/dist`,
  },
}).compile()
