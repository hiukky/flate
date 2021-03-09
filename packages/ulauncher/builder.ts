import { Ulauncher } from '@zort/ulauncher'
import { getThemesDir } from '@flate/setup'

export const builder = new Ulauncher({
  paths: getThemesDir(__dirname),
})

builder.compile()
