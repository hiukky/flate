import { Insomnia } from '@zort/insomnia'
import { getThemesDir } from '@flate/setup'

new Insomnia({
  dir: {
    dist: `${__dirname}/dist`,
    themes: getThemesDir(),
  },
}).compile()
