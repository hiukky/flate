import { builder } from './builder'

describe('Code', () => {
  it('should build the theme successfully', async () => {
    expect(await builder.compile()).toBe(true)
  })
})
