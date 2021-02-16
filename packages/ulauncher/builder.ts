import { Ulauncher } from '@zort/ulauncher'
import { getThemesDir } from '@flate/setup'

export const builder = new Ulauncher({
  dir: getThemesDir(__dirname),
})

builder.compile()
