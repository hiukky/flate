import { builder } from './builder'

describe('Ulauncher', () => {
  it('should build the theme successfully', () =>
    expect(builder.compile()).resolves.toBe(true))
})
