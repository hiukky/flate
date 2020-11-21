import path from 'path'
import rimraf from 'rimraf'

/**
 * @function getMockPath
 *
 * @desc Get builder's mock directory.
 *
 * @param {string} builder
 */
export const getMockPath = (builder: string) => ({
  rootDir: {
    build: path.join(__dirname, builder, 'mock', 'dist'),
    themes: path.join(__dirname, builder, 'mock'),
  },
})

/**
 * @function clean
 *
 * @desc Clear directory.
 *
 * @param {string} dir
 */
export const clean = (dir: string) => rimraf.sync(dir)

/**
 * @function cleanOutput
 *
 * @desc Remove spaces from strings and line breaks.
 *
 * @param {string} value
 */
export const cleanOutput = (value: string): string =>
  value.replace(/\s\s+/g, ' ').trim()
