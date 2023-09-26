const Url = require('../../models/url-model')

describe('url', () => {
  describe('validations', () => {
    it('is valid without any input from url', async () => {
      const url = new Url()
      const errors = await url.validate()

      expect(errors).toBeUndefined()
    })
  })
})
