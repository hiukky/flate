import { builder } from './builder'

describe('Code', () => {
  it('should build the theme successfully', () => {
    expect(builder.compile()).toBe(true)
  })
})
