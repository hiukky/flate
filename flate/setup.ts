import { join } from 'path'

export const getThemesDir = (
  dirname: string,
): Record<'themes' | 'dist' | 'root', string> => ({
  root: dirname,
  themes: join(__dirname, 'themes'),
  dist: join(dirname, 'dist'),
})
