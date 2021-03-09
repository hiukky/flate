import { Insomnia } from '@zort/insomnia'
import { getThemesDir } from '@flate/setup'

export const builder = new Insomnia({
  paths: getThemesDir(__dirname),
})

builder.compile()
