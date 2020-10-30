import { BaseBuilder } from '../base'
import { IVscodeBuilder } from './vscode.interface'

export class VScodeBuilder extends BaseBuilder implements IVscodeBuilder {
  /**
   * @method createVariants
   *
   * Create new theme variants.
   */
  createVariants(): string {
    if (this.theme.variants.length) {
      this.theme.variants.forEach(theme => {
        this.theme.final[
          `${theme.variant}${
            theme.fontStyle && typeof theme.fontStyle === 'string'
              ? `.${theme.fontStyle}${this.extensions.json}`
              : this.extensions.json
          }`
        ] = theme
      })
    } else {
      this.theme.final[
        `${this.theme.stage.variant}${this.extensions.json}`
      ] = this.theme.stage
    }

    return 'created'
  }

  /**
   * @method setFontStyle
   *
   * Creates different variants with different font styles.
   */
  setFontStyles(): this {
    let theme = this.theme.stage

    if (theme.fontStyle) {
      Object.values(theme.fontStyle).forEach((fontStyle: any) => {
        theme = {
          ...theme,
          tokenColors: theme.tokenColors.map((token: any) => ({
            ...token,
            settings: {
              ...token.settings,
              fontStyle: fontStyle === 'none' ? '' : fontStyle,
            },
          })),
          fontStyle: fontStyle === 'none' ? '' : fontStyle,
        }

        this.theme.variants.push(theme)
      })
    }

    return this
  }

  /**
   * @function merge
   *
   * Where the magic happens.
   *
   * @param theme
   */
  merge(theme: any): void {
    this.theme.stage = theme
    this.setColors().setFontStyles().createVariants()
  }

  /**
   * @method stage
   *
   * Stage method where the finishing touches are applied.
   */
  stage(): void {
    this.listThemes.forEach(themeName => {
      this.merge({
        ...this.getFile(`${this.rootDir.themes}/common/base.json`),
        ...this.getFile(`${this.rootDir.themes}/${themeName}`),
      })
    })
  }

  /**
   * @method compile
   *
   * Responsible for the construction.
   */
  compile(): string {
    this.stage()

    if (this.theme.final) {
      Object.entries(this.theme.final).map(([name, theme]) =>
        this.createFile({
          path: this.rootDir.build,
          file: theme,
          fileName: name,
        }),
      )
    }

    return 'done'
  }
}
