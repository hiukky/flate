import sass from 'node-sass'
import { BaseBuilder } from '../base'
import {
  IUlauncherBuilder,
  TThemeType,
  TThemeShema,
} from './ulauncher.interface'

export class UlauncherBuilder extends BaseBuilder implements IUlauncherBuilder {
  /**
   * @function fileNames
   *
   * @desc Default theme file names supported by the ulauncher theme manifest.
   */
  get fileNames() {
    return {
      manifest: 'manifest',
      theme: 'theme',
      themeGtk: 'theme-gtk-3.20',
    }
  }

  /**
   * @function readCommonTheme
   *
   * @desc Get the default base theme.
   *
   * @param {TThemeType} type
   */
  readCommonTheme(type: TThemeType): string {
    return this.scss.read(
      `${this.rootDir.themes}/common/${
        type === 'main'
          ? `${this.fileNames.theme}.scss`
          : `${this.fileNames.themeGtk}.scss`
      }`,
    )
  }

  /**
   * @function getTheme
   *
   * @desc Returns the default theme scss with the variant color scheme applied.
   *
   * @param {TThemeType} type
   * @param {string} variant
   */
  getTheme(type: 'main' | 'gtk', variant: string): string {
    const theme = sass.renderSync({
      data: [
        `@import "${this.scss.colorDirectory}/${variant}.scss";`,
        type === 'gtk'
          ? `@import "${this.rootDir.themes}/common/${this.fileNames.theme}";`
          : '',
        ...this.readCommonTheme(type).split('\n'),
      ].join('\n'),
    })

    return theme.css.toString()
  }

  /**
   * @method createManifest
   *
   * @desc Create new theme variants.
   *
   * @param {string} themeName
   */
  createManifest(themeName: string): Object {
    return {
      ...this.getFile(`${this.rootDir.themes}/common/base.json`),
      ...this.getFile(`${this.rootDir.themes}/${themeName}`),
    }
  }

  /**
   * @method createVariants
   *
   * @desc Create new theme variants.
   */
  createVariants(): string {
    this.theme.final[this.theme.stage.variant] = this.theme.stage
    return 'created'
  }

  /**
   * @function merge
   *
   * @desc Where the magic happens.
   *
   * @param {TThemeShema} theme
   */
  merge(theme: TThemeShema): void {
    this.theme.stage = theme
    this.setColors().createVariants()
  }

  /**
   * @method stage
   *
   * @desc Stage method where the finishing touches are applied.
   */
  stage(): void {
    this.listThemes.forEach(themeName => {
      const [variant] = themeName.split('.')

      this.merge({
        [`${this.fileNames.theme}.css`]: this.getTheme('main', variant),
        [`${this.fileNames.themeGtk}.css`]: this.getTheme('gtk', variant),
        [`${this.fileNames.manifest}.json`]: this.createManifest(themeName),
        variant,
      })
    })
  }

  /**
   * @method compile
   *
   * @desc Responsible for the construction.
   */
  compile(): string {
    this.stage()

    if (this.theme.final) {
      Object.entries(this.theme.final).forEach(([name, theme]) => {
        Object.entries(theme).map(
          ([fileName, file]: any) =>
            fileName !== 'variant' &&
            this.createFile({
              path: `${this.rootDir.build}/${name}`,
              file,
              fileName,
            }),
        )
      })
    }

    return 'done'
  }
}
