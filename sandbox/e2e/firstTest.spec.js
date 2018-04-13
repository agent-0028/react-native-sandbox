const { takeScreenshot } = require ('./helpers')

describe('Example', () => {
  afterEach(async () => {
    takeScreenshot()
  })

  it('should render the main view', async () => {
    await expect(element(by.id('whatever'))).toBeVisible()
  })
})
