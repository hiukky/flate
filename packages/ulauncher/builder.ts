import { Ulauncher } from '@zort/ulauncher'
import { getThemesDir } from '@flate/setup'

new Ulauncher({
  dir: {
    dist: `${__dirname}/dist`,
    themes: getThemesDir(),
  },
}).compile()
