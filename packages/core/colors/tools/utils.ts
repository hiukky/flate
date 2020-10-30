import path from 'path'

/**
 * @function getMockPath
 *
 * @desc Get builder's mock directory.
 *
 * @param {string} builder
 */
export const getMockPath = (builder: string) => ({
  rootDir: {
    scss: path.join(__dirname, builder, 'mock'),
  },
})
