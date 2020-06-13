const fs = require('fs')

const dir = {
  themes: `${process.cwd()}/themes`,
  build: `${process.cwd()}/dist`,
}

/**
 * @function getFile
 *
 * @param {String} dirFile
 */
const getFile = (dirFile) => JSON.parse(fs.readFileSync(dirFile, 'utf8'))

/**
 * @function createFile
 *
 * @param {String} path
 * @param {String} file
 * @param {String} fileName
 */
const createFile = (path, file, fileName) => {
  fs.readdir(path, (err) => {
    if (err) fs.mkdirSync(path)
  })

  fs.writeFile(`${path}/${fileName}`, JSON.stringify(file), (err) => {
    if (err) console.error('CREATE FILE ERROR: ', error)
  })
}

const listThemes = fs
  .readdirSync(dir.themes)
  .filter((theme) => theme.match(/\.[0-9a-z]+$/i))

const baseTheme = getFile(`${dir.themes}/common/base.color-theme.json`)

if (listThemes && baseTheme) {
  for (let theme of listThemes) {
    Promise.resolve(
      createFile(dir.build, getFile(`${dir.themes}/${theme}`), theme)
    )
  }
}
