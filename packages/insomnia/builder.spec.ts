import { builder } from './builder'

describe('Insomnia', () => {
  it('should build the theme successfully', () => {
    expect(builder.compile()).toBe(true)
  })
})
