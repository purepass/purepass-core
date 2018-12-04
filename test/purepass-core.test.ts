import { Purepass, PurepassOptions } from '../src/purepass-core'
const purepass = new Purepass()

describe('purepass', () => {
  describe('should generate a password to spec with just a secret', () => {
    it('should generate a password 64 characters in length', () => {
      const generatedPw = purepass.generatePassword('12345678')
      expect(generatedPw.length).toEqual(64)
    })
  })

  describe('purepass/validators', () => {
    describe('namespace validation', () => {
      it('should throw if namespace is not 2 characters in length', () => {
        expect(() => {
          purepass.generatePassword('password123', { namespace: '123' })
        }).toThrow()
      })
      it('should generate if namespace is defined and meets constraints', () => {
        expect(purepass.generatePassword('password123', { namespace: 'fa' })).toHaveLength(64)
      })
    })

    describe('specialCharcater validation', () => {
      it('should throw if specialCharacter is not 1 character in length', () => {
        expect(() => {
          purepass.generatePassword('password123', { specialCharacter: '123' })
        }).toThrow()
      })
      it('should throw if specialCharacter is not 1 character in length', () => {
        expect(() => {
          purepass.generatePassword('password123', { specialCharacter: '123' })
        }).toThrow()
      })
      it('should generate if specialCharacter is defined and meets constraints', () => {
        expect(purepass.generatePassword('password123', { specialCharacter: '*' })).toHaveLength(64)
      })
    })

    describe('maxPassword validation', () => {
      it('should throw if maxPasswordLength is less than base length 8, and post prefix length 13', () => {
        expect(() => {
          purepass.generatePassword('password123', { maxPasswordLength: 12 })
        }).toThrow()
      })
      it('should generate if maxPassword the option is defined and meets constraints', () => {
        expect(purepass.generatePassword('password123', { maxPasswordLength: 14 })).toHaveLength(14)
      })
    })
  })
})
