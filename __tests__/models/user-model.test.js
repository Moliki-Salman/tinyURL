const User = require('../../models/user-model')

describe('User', () => {
  describe('validations', () => {
    // @Moliki-Salman: The user model allows someone to exist without name or email
    it('is valid without any input from user', async () => {
      const user = new User()
      const errors = await user.validate()

      expect(errors).toBeUndefined()
    })
  })
})