import { join } from 'path'

export const getThemesDir = (
  dirname: string,
): Record<'themes' | 'dist', string> => ({
  themes: join(__dirname, 'themes'),
  dist: join(dirname, 'dist'),
})
