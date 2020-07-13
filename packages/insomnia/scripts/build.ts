import { Build } from '../../core'

new Build({
  themes: `${process.cwd()}/themes`,
  build: `${process.cwd()}/dist`,
}).compile()
