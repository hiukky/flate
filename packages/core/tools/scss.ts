import fs from 'fs'
import path from 'path'

import { IScss } from './types'

class Scss implements IScss {
  /**
   * @method read
   *
   * Read the reported scss files.
   *
   * @param {String} path
   */
  read(path: string): string {
    return fs.readFileSync(path, 'utf8')
  }

  /**
   * @method parse
   *
   * Parse the read scss file to JSON.
   *
   * @param {String} file
   */
  parse(file: string): object {
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
   * @method toJSON
   *
   * Merge complete files read and their dependencies.
   *
   * @param {String} path
   * @param {String} fileName
   */
  toJSON(path: string, fileName: string) {
    var schemeJSON: { [k: string]: any } = {}
    var dependencies: { [k: string]: any } = {}
    var file = this.read(`${path}/${fileName}`)

    if (file) {
      file = file
        .split(';')
        .filter(row => {
          if (row.match(/\@import/)) {
            let key = row.split(' ')[1].slice(1, -1)

            dependencies = {
              [key]: this.parse(this.read(`${path}/` + key.replace('./', ''))),
            }
          } else {
            return row
          }

          return
        })
        .join(';')

      file = this.parse(file) as any
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

  /**
   * @method getColors
   *
   * Obtains a color scheme according to the variant.
   *
   * @param {String} variant
   */
  getColors(variant: string) {
    return this.toJSON(
      path.join(__dirname, '..', '..', '/core/colors'),
      `${variant}.scss`,
    )
  }
}

export default new Scss()
