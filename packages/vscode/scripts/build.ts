import { Build, SCSS } from '../../core'

new Build({
  themes: `${process.cwd()}/themes`,
  build: `${process.cwd()}/dist`,
})
  .stage(theme => {
    if (Object.entries(theme).length) {
      const schemeColors = SCSS.getColors(theme.variant)

      var colors: { [k: string]: string } = {}
      var tokenColors = []

      if (schemeColors) {
        Object.entries(theme.colors).map(
          ([k, v]: [string, any]) =>
            (colors[k] = schemeColors[v] || v || schemeColors.$red),
        )

        tokenColors = theme.tokenColors.map((token: any) => {
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

    return theme
  })
  .compile()
