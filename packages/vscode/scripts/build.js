const fs = require('fs')
const path = require('path')
const scss = require('../../core/tools/scss')

const dir = {
  themes: `${process.cwd()}/themes`,
  build: `${process.cwd()}/dist`,
}

const listThemes = fs
  .readdirSync(dir.themes)
  .filter(theme => theme.match(/\.[0-9a-z]+$/i))

/**
 * @function getColors
 *
 * Obtains a color scheme according to the variant.
 *
 * @param {String} variant
 */
const getColors = variant =>
  scss.toJSON(
    path.join(__dirname, '..', '..', '/core/colors'),
    `${variant}.scss`,
  )

/**
 * @function getFile
 *
 * Loads the JSON file with theme specifications.
 *
 * @param {String} dirFile
 */
const getFile = dirFile => JSON.parse(fs.readFileSync(dirFile, 'utf8'))

/**
 * @function createFile
 *
 * Creates the compiled theme.
 *
 * @param {String} path
 * @param {String} file
 * @param {String} fileName
 */
const createFile = (path, file, fileName) => {
  fs.readdir(path, error => {
    if (error) fs.mkdirSync(path)
  })

  fs.writeFile(`${path}/${fileName}`, JSON.stringify(file), error => {
    if (error) return
  })
}

/**
 * @function mergeColors
 *
 * Loads the color specified in the scope of theme settings.
 *
 * @param {Object} theme
 */
const mergeColors = theme => {
  if (Object.entries(theme).length) {
    const schemeColors = getColors(theme.variant)

    if (schemeColors) {
      var colors = {}

      Object.entries(theme.colors).map(
        ([k, v]) => (colors[k] = schemeColors[v] || v || schemeColors.$red),
      )

      var tokenColors = theme.tokenColors.map(token => {
        token.settings = {
          ...token.settings,
          foreground:
            schemeColors[token.settings.foreground] ||
            token.settings.foreground ||
            schemeColors.$red,
        }

        return token
      })
    }

    return { ...theme, colors, tokenColors }
  }
}

/**
 * @function build
 *
 * Responsible for compiling the theme.
 */
const build = () => {
  const baseTheme = getFile(`${dir.themes}/common/base.json`)

  listThemes.map(themeName => {
    let fileTheme = getFile(`${dir.themes}/${themeName}`)

    if (fileTheme) {
      createFile(
        dir.build,
        mergeColors(Object.assign({}, baseTheme, fileTheme)),
        themeName,
      )
    }
  })
}

build()
