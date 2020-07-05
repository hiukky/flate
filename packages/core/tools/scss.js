const fs = require('fs')

/**
 * @function read
 *
 * Read the reported scss files.
 *
 * @param {String} path
 */
const read = path => fs.readFileSync(path, 'utf8')

/**
 * @function parse
 *
 * Parse the read scss file to JSON.
 *
 * @param {String} file
 */
const parse = file => {
  var schemeJSON = {}

  if (file) {
    file
      .split(/\n/)
      .filter(s => !!s)
      .map(s => s.replace(';', '').split(':'))
      .map(([k, v]) => (schemeJSON = { ...schemeJSON, [k]: v.trim() }))
  }

  return schemeJSON
}

/**
 * @function toJSON
 *
 * Merge complete files read and their dependencies.
 *
 * @param {String} path
 * @param {String} fileName
 */
const toJSON = (path, fileName) => {
  var schemeJSON = {}
  var dependencies = {}
  var file = read(`${path}/${fileName}`)

  if (file) {
    file = file
      .split(';')
      .filter(row => {
        if (row.match(/\@import/)) {
          let key = row.split(' ')[1].slice(1, -1)

          dependencies = {
            [key]: parse(read(`${path}/` + key.replace('./', ''))),
          }
        } else {
          return row
        }
      })
      .join(';')

    file = parse(file)
  }

  if (Object.entries(file).length) {
    if (Object.entries(dependencies).length) {
      dependencies = Object.values(dependencies)[0]
    }

    Object.entries(file).map(
      ([k, v]) =>
        (schemeJSON = {
          ...schemeJSON,
          [k]: v.match(/\$/) ? dependencies[v] || schemeJSON[v] : v,
        }),
    )

    return { ...dependencies, ...schemeJSON }
  }

  return schemeJSON
}

module.exports = {
  read,
  parse,
  toJSON,
}
