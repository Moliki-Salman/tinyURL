const Url = require('../../models/url-model')

describe('url', () => {
  describe('validations', () => {
    // @Moliki-Salman: The url model allows a url to exist without url or user
    it('is valid without any input from url', async () => {
      const url = new Url()
      const errors = await url.validate()

      expect(errors).toBeUndefined()
    })
  })
})