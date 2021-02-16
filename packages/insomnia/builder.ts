import { Insomnia } from '@zort/insomnia'
import { getThemesDir } from '@flate/setup'

export const builder = new Insomnia({
  dir: getThemesDir(__dirname),
})

builder.compile()
