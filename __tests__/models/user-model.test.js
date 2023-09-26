const User = require('../../models/user-model')

describe('User', () => {
  describe('validations', () => {
    it('is valid without any input from user', async () => {
      const user = new User()
      const errors = await user.validate()

      expect(errors).toBeUndefined()
    })
  })
})
