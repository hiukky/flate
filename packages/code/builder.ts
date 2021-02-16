import { Code } from '@zort/code'
import { getThemesDir } from '@flate/setup'

new Code({
  dir: {
    dist: `${__dirname}/dist`,
    themes: getThemesDir(),
  },
})
  .set({ type: 'dark', fontStyle: ['none', 'italic', 'bold'] })
  .compile()
