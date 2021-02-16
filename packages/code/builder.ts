import { Code } from '@zort/code'
import { getThemesDir } from '@flate/setup'

export const builder = new Code({
  dir: getThemesDir(__dirname),
}).set({ type: 'dark', fontStyle: ['none', 'italic', 'bold'] })

builder.compile()
