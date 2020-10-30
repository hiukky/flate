import fs from 'fs'
import { resolve } from 'path'
import { IScss } from './scss.interface'

export class ScssTool implements IScss {
  /**
   * @function colorDirectory
   *
   * @desc Get the directory of scss files with color scheme.
   */
  get colorDirectory() {
    return resolve(__dirname, '..', '..', 'scss')
  }

  /**
   * @method read
   *
   * @desc Read the reported scss files.
   *
   * @param {String} path
   */
  read(path: string): string {
    return fs.readFileSync(path, 'utf8')
  }

  /**
   * @method toJSON
   *
   * @desc Parse the read scss file to JSON.
   *
   * @param {String} file
   */
  toJSON(file: string): object {
    let schemeJSON = {}

    if (file) {
      file
        .split(/\n/)
        .filter(s => !!s)
        .map(s => s.replace(';', '').split(':'))
        .map(([k, v]) => {
          schemeJSON = { ...schemeJSON, [k]: v?.trim() }
          return true
        })
    }

    return schemeJSON
  }

  /**
   * @method resolve
   *
   * @desc Merge complete files read and their dependencies.
   *
   * @param {String} path
   * @param {String} fileName
   */
  resolve(path: string, fileName: string) {
    let schemeJSON: { [k: string]: any } = {}
    let dependencies: { [k: string]: any } = {}
    let file = ''

    if (path && fileName) {
      file = this.read(`${path}/${fileName}`)
    }

    if (file) {
      file = file
        .split(';')
        .filter(row => {
          if (row.match(/@import/)) {
            const key = row.split(' ')[1].slice(1, -1)

            dependencies = {
              [key]: this.toJSON(
                this.read(`${path}/_${key.replace('./', '')}.scss`),
              ),
            }

            return false
          }

          return row
        })
        .join(';')

      file = this.toJSON(file) as any
    }

    if (Object.entries(file).length) {
      if (Object.entries(dependencies).length) {
        ;[dependencies] = Object.values(dependencies)
      }

      Object.entries(file).map(([k, v]) => {
        schemeJSON = {
          ...schemeJSON,
          [k]: v.match(/\$/) ? dependencies[v] || schemeJSON[v] : v,
        }

        return file
      })

      return { ...dependencies, ...schemeJSON }
    }

    return schemeJSON
  }

  /**
   * @method getColors
   *
   * @desc Obtains a color scheme according to the variant.
   *
   * @param {String} path
   * @param {String} variant
   */
  getColors(path: string | null, variant: string): object {
    return this.resolve(path || this.colorDirectory, `${variant}.scss`)
  }
}